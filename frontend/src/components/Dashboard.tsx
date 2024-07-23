import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestForm from './RequestForm';
import RequestList from './RequestList';

export interface Request {
    id: number;
    item: string;
    cost: number;
    reason: string;
    status: string;
}

export interface NewRequest {
    item: string;
    cost: number;
    reason: string;
}

const Dashboard: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get<Request[]>(`${apiUrl}/api/requests`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        }
    };
    
    useEffect(() => {
        fetchRequests();
    }, []);
    
    const handleNewRequest = (newRequest: NewRequest) => {
        fetchRequests();  // Refetch all requests to get the newly created one with correct id and status
    };
    
    return (
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">New Request</h2>
        <RequestForm onNewRequest={handleNewRequest} />
        </div>
        <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">Your Requests</h2>
        <RequestList requests={requests} />
        </div>
        </div>
        </div>
    );
};

export default Dashboard;