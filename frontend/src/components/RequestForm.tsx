import React, { useState } from 'react';
import axios from 'axios';

interface Request {
    id: number;
    item: string;
    cost: number;
    reason: string;
    status: string;
}

interface RequestFormProps {
    onNewRequest: (request: Request) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onNewRequest }) => {
    const [item, setItem] = useState('');
    const [cost, setCost] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setMessage('');
    //     setError('');
    //     try {
    //         const token = localStorage.getItem('token');
    //         const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    //         const response = await axios.post(
    //             `${apiUrl}/api/requests`,
    //             { item, cost: parseFloat(cost), reason },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //         setMessage('Request submitted successfully');
    //         onNewRequest(response.data);
    //         setItem('');
    //         setCost('');
    //         setReason('');
    //     } catch (error) {
    //         console.error('Failed to submit request:', error);
    //         setError('Failed to submit request. Please try again.');
    //     }
    // };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(
                `${apiUrl}/api/requests`,
                { item, cost: parseFloat(cost), reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Request submitted successfully');
            onNewRequest({ item, cost: parseFloat(cost), reason });
            setItem('');
            setCost('');
            setReason('');
        } catch (error) {
            console.error('Failed to submit request:', error);
            setError('Failed to submit request. Please try again.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item</label>
        <input
        type="text"
        id="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        </div>
        <div>
        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
        <input
        type="number"
        id="cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        </div>
        <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
        id="reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        </div>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Submit Request
        </button>
        </form>
    );
};

export default RequestForm;