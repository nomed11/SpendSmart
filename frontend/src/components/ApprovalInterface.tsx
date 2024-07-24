// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Request {
//     id: number;
//     item: string;
//     cost: number;
//     reason: string;
//     status: string;
// }

// const ApprovalInterface: React.FC = () => {
//     const [requests, setRequests] = useState<Request[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             console.log('API Response:', response.data);  // Debug log

//             if (Array.isArray(response.data)) {
//                 const pendingRequests = response.data.filter((req: Request) => req.status === 'pending');
//                 setRequests(pendingRequests);
//             } else {
//                 console.error('Unexpected response format:', response.data);
//                 setError('Unexpected data format received from server');
//             }
//         } catch (error) {
//             console.error('Failed to fetch requests:', error);
//             setError('Failed to fetch requests. Please try again later.');
//         }
//     };

//     const handleApproval = async (id: number, status: 'approved' | 'rejected') => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.put(`${import.meta.env.VITE_API_URL}/api/requests/${id}`,
//                 { status },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             fetchRequests();
//         } catch (error) {
//             console.error('Failed to update request:', error);
//             setError('Failed to update request. Please try again.');
//         }
//     };

//     if (error) {
//         return <div className="text-red-500">{error}</div>;
//     }

//     return (
//         <div className="container px-4 mx-auto sm:px-6 lg:px-8">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-900">Pending Approvals</h2>
//         {requests.length === 0 ? (
//             <p>No pending requests found.</p>
//         ) : (
//             <div className="flex flex-col">
//             <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//             <tr>
//             <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Item</th>
//             <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Cost</th>
//             <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reason</th>
//             <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
//             </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//             {requests.map((request) => (
//                 <tr key={request.id}>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{request.item}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${request.cost.toFixed(2)}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{request.reason}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
//                 <button
//                 onClick={() => handleApproval(request.id, 'approved')}
//                 className="mr-4 text-indigo-600 hover:text-indigo-900"
//                 >
//                 Approve
//                 </button>
//                 <button
//                 onClick={() => handleApproval(request.id, 'rejected')}
//                 className="text-red-600 hover:text-red-900"
//                 >
//                 Reject
//                 </button>
//                 </td>
//                 </tr>
//             ))}
//             </tbody>
//             </table>
//             </div>
//             </div>
//             </div>
//             </div>
//         )}
//         </div>
//     );
// };

// export default ApprovalInterface;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Request {
    id: number;
    item: string;
    cost: number;
    reason: string;
    status: string;
}

const ApprovalInterface: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetchRequests();
    }, []);
    
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (Array.isArray(response.data)) {
                const pendingRequests = response.data.filter((req: Request) => req.status === 'pending');
                setRequests(pendingRequests);
            } else {
                console.error('Unexpected response format:', response.data);
                setError('Unexpected data format received from server');
            }
        } catch (error) {
            console.error('Failed to fetch requests:', error);
            setError('Failed to fetch requests. Please try again later.');
        }
    };
    
    const handleApproval = async (id: number, status: 'approved' | 'rejected') => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/api/requests/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRequests(); // Refresh the list after updating
        } catch (error) {
            console.error('Failed to update request:', error);
            setError('Failed to update request. Please try again.');
        }
    };
    
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    
    return (
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Pending Approvals</h2>
        {requests.length === 0 ? (
            <p>No pending requests found.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Item</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Cost</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reason</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
                <tr key={request.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{request.item}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${request.cost.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{request.reason}</td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <button
                onClick={() => handleApproval(request.id, 'approved')}
                className="mr-4 text-indigo-600 hover:text-indigo-900"
                >
                Approve
                </button>
                <button
                onClick={() => handleApproval(request.id, 'rejected')}
                className="text-red-600 hover:text-red-900"
                >
                Reject
                </button>
                </td>
                </tr>
            ))}
            </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default ApprovalInterface;