// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import RequestForm from './RequestForm';
// import RequestList from './RequestList';

// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard: React.FC = () => {
//     const [spendByCategory, setSpendByCategory] = useState<Record<string, number>>({});
//     const [spendOverTime, setSpendOverTime] = useState<{ date: string; amount: number }[]>([]);
//     const [requests, setRequests] = useState<any[]>([]);

//     useEffect(() => {
//         fetchData();
//         fetchRequests();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const [categoryResponse, timeResponse] = await Promise.all([
//                 axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/spend-by-category?status=approved`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 }),
//                 axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/spend-over-time?status=approved`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 })
//             ]);
//             setSpendByCategory(categoryResponse.data);
//             setSpendOverTime(timeResponse.data);
//         } catch (error) {
//             console.error('Failed to fetch dashboard data:', error);
//         }
//     };

//     const fetchRequests = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setRequests(response.data);
//         } catch (error) {
//             console.error('Failed to fetch requests:', error);
//         }
//     };

//     const handleNewRequest = (newRequest: any) => {
//         setRequests(prevRequests => [...prevRequests, newRequest]);
//         // Fetch updated data
//         fetchRequests();
//         fetchData();
//     };

//     const categoryData = {
//         labels: Object.keys(spendByCategory),
//         datasets: [
//             {
//                 label: 'Spend by Category',
//                 data: Object.values(spendByCategory),
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     const timeData = {
//         labels: spendOverTime.map(item => item.date),
//         datasets: [
//             {
//                 label: 'Spend Over Time',
//                 data: spendOverTime.map(item => item.amount),
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             },
//         ],
//     };

//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'top' as const,
//             },
//             title: {
//                 display: true,
//                 text: 'Expense Analytics',
//             },
//         },
//     };

//     return (
//         <div className="container px-4 mx-auto mt-8">
//         <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard</h1>
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <div className="p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="mb-4 text-xl font-semibold text-gray-700">Spend by Category</h2>
//         <div style={{ height: '300px' }}>
//         <Bar data={categoryData} options={chartOptions} />
//         </div>
//         </div>
//         <div className="p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="mb-4 text-xl font-semibold text-gray-700">Spend Over Time</h2>
//         <div style={{ height: '300px' }}>
//         <Line data={timeData} options={chartOptions} />
//         </div>
//         </div>
//         </div>
//         <div className="mt-8 bg-white rounded-lg shadow-lg">
//         <div className="p-6">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-800">New Request</h2>
//         <RequestForm onNewRequest={handleNewRequest} />
//         </div>
//         </div>
//         <div className="mt-8 bg-white rounded-lg shadow-lg">
//         <div className="p-6">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-800">Your Requests</h2>
//         <RequestList requests={requests} />
//         </div>
//         </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import RequestForm from './RequestForm';
import RequestList from './RequestList';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const [spendByCategory, setSpendByCategory] = useState<Record<string, number>>({});
    const [spendOverTime, setSpendOverTime] = useState<{ date: string; amount: number }[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    
    const fetchData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const [categoryResponse, timeResponse, requestsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/spend-by-category?status=approved`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/spend-over-time?status=approved`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            setSpendByCategory(categoryResponse.data);
            setSpendOverTime(timeResponse.data);
            setRequests(requestsResponse.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const handleNewRequest = useCallback(async (newRequest: any) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/requests`,
                newRequest,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (error) {
            console.error('Failed to submit request:', error);
        }
    }, [fetchData]);
    
    const categoryData = {
        labels: Object.keys(spendByCategory),
        datasets: [
            {
                label: 'Spend by Category',
                data: Object.values(spendByCategory),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };
    
    const timeData = {
        labels: spendOverTime.map(item => item.date),
        datasets: [
            {
                label: 'Spend Over Time',
                data: spendOverTime.map(item => item.amount),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Expense Analytics',
            },
        },
    };
    
    return (
        <div className="container px-4 mx-auto mt-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Spend by Category</h2>
        <div style={{ height: '300px' }}>
        <Bar data={categoryData} options={chartOptions} />
        </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Spend Over Time</h2>
        <div style={{ height: '300px' }}>
        <Line data={timeData} options={chartOptions} />
        </div>
        </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-lg">
        <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">New Request</h2>
        <RequestForm onNewRequest={handleNewRequest} />
        </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-lg">
        <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Your Requests</h2>
        <RequestList requests={requests} />
        </div>
        </div>
        </div>
    );
};

export default Dashboard;