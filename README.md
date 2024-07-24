# SpendSmart: AI-Powered Expense Management System

## Overview

SpendSmart is a modern, AI-enhanced expense management system designed to streamline the process of submitting, reviewing, and analyzing business expenses. Built with a React frontend and a Flask backend, it leverages machine learning for intelligent approval suggestions and integrates with Slack for real-time notifications.

## Features

- **User Authentication**: Secure JWT-based authentication system.
- **Expense Submission**: Easy-to-use interface for submitting new expense requests.
- **AI-Powered Approval Suggestions**: Machine learning model that suggests approval based on historical data.
- **Real-time Notifications**: Slack integration for instant updates on new requests and status changes.
- **Expense Approval Workflow**: Intuitive interface for approving or rejecting pending requests.
- **Dashboard Analytics**: Visual representations of spending patterns by category and over time.
- **Responsive Design**: Fully responsive web application accessible on various devices.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Python, Flask, SQLAlchemy
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Machine Learning**: scikit-learn (RandomForestClassifier)
- **API Integration**: Slack API
- **Version Control**: Git

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/nomed11/spendsmart.git
   cd spendsmart
   ```

2. Set up the backend:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   SECRET_KEY=your_secret_key_here
   SLACK_API_TOKEN=your_slack_api_token_here
   ```

5. Start the backend server:
   ```
   cd ../backend
   flask run
   ```

6. In a new terminal, start the frontend development server:
   ```
   cd ../frontend
   npm run dev
   ```

7. Access the application at `http://localhost:5173`

## Usage

1. Register a new account or log in with existing credentials.
2. Submit new expense requests using the request form.
3. View pending requests in the approval interface.
4. Approve or reject requests as needed.
5. Check the dashboard for spending analytics.

## API Endpoints

- `POST /api/register`: Register a new user
- `POST /api/login`: Authenticate a user and receive a JWT
- `GET /api/requests`: Retrieve all requests for the authenticated user
- `POST /api/requests`: Create a new expense request
- `PUT /api/requests/<id>`: Update the status of a request
- `POST /api/requests/suggest-approval`: Get an AI-generated approval suggestion
- `GET /api/dashboard/spend-by-category`: Retrieve spending data by category
- `GET /api/dashboard/spend-over-time`: Retrieve spending data over time

## Future Enhancements

- Integration with popular accounting software
- Mobile application for on-the-go expense submission
- Advanced analytics with predictive spending forecasts
- Multi-currency support for international businesses

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
