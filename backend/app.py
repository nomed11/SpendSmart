from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, SpendRequest, User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
import datetime
from slack import WebClient
from slack.errors import SlackApiError
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spendsmart.db'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db.init_app(app)

# Slack client setup
slack_token = os.environ.get("SLACK_API_TOKEN")
slack_client = WebClient(token=slack_token)

# Machine Learning model
model = RandomForestClassifier()
model_trained = False

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def send_slack_notification(message):
    try:
        response = slack_client.chat_postMessage(
            channel="#spend-requests",
            text=message
        )
    except SlackApiError as e:
        print(f"Error sending Slack message: {e}")

def train_model():
    global model, model_trained
    requests = SpendRequest.query.all()
    if len(requests) < 10:  # Arbitrary minimum number for training
        return
    
    data = pd.DataFrame([{
        'cost': r.cost,
        'status': 1 if r.status == 'approved' else 0
    } for r in requests])
    
    X = data[['cost']]
    y = data['status']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model.fit(X_train, y_train)
    model_trained = True

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.json
    user = User.query.filter_by(username=auth['username']).first()
    if user and check_password_hash(user.password, auth['password']):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                           app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/requests', methods=['GET', 'POST'])
@token_required
def handle_requests(current_user):
    if request.method == 'POST':
        try:
            data = request.json
            new_request = SpendRequest(
                item=data['item'],
                cost=data['cost'],
                reason=data['reason'],
                status='pending',
                user_id=current_user.id
            )
            db.session.add(new_request)
            db.session.commit()
            send_slack_notification(f"New spend request created by {current_user.username}")
            
            # Retrain model with new data
            train_model()
            
            return jsonify({"message": "Request created successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        requests = SpendRequest.query.filter_by(user_id=current_user.id).all()
        return jsonify([r.to_dict() for r in requests])

@app.route('/api/requests/<int:request_id>', methods=['PUT'])
@token_required
def update_request(current_user, request_id):
    try:
        spend_request = SpendRequest.query.get_or_404(request_id)
        if spend_request.user_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
        data = request.json
        spend_request.status = data['status']
        db.session.commit()
        send_slack_notification(f"Spend request {request_id} updated to {data['status']}")
        
        # Retrain model with updated data
        train_model()
        
        return jsonify({"message": "Request updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/requests/suggest-approval', methods=['POST'])
@token_required
def suggest_approval(current_user):
    data = request.json
    cost = data.get('cost')
    
    if not model_trained:
        return jsonify({"message": "Not enough data to make a suggestion"}), 400
    
    suggestion = model.predict([[cost]])[0]
    return jsonify({"suggested_approval": bool(suggestion)})

@app.route('/api/dashboard/spend-by-category', methods=['GET'])
@token_required
def spend_by_category(current_user):
    requests = SpendRequest.query.filter_by(user_id=current_user.id).all()
    categories = {}
    for r in requests:
        if r.item not in categories:
            categories[r.item] = 0
        categories[r.item] += r.cost
    return jsonify(categories)

@app.route('/api/dashboard/spend-over-time', methods=['GET'])
@token_required
def spend_over_time(current_user):
    requests = SpendRequest.query.filter_by(user_id=current_user.id).order_by(SpendRequest.created_at).all()
    data = [{'date': r.created_at.strftime('%Y-%m-%d'), 'amount': r.cost} for r in requests]
    return jsonify(data)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)