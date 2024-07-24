// import React, { useState } from 'react';
// import axios from 'axios';

// interface Request {
//     id: number;
//     item: string;
//     cost: number;
//     reason: string;
//     status: string;
// }

// interface RequestFormProps {
//     onNewRequest: (request: Request) => void;
// }

// const RequestForm: React.FC<RequestFormProps> = ({ onNewRequest }) => {
//     const [item, setItem] = useState('');
//     const [cost, setCost] = useState('');
//     const [reason, setReason] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [suggestion, setSuggestion] = useState<string | null>(null);

//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     setMessage('');
//     //     setError('');
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//     //         await axios.post(
//     //             `${apiUrl}/api/requests`,
//     //             { item, cost: parseFloat(cost), reason },
//     //             { headers: { Authorization: `Bearer ${token}` } }
//     //         );
//     //         setMessage('Request submitted successfully');
//     //         onNewRequest({ item, cost: parseFloat(cost), reason });
//     //         setItem('');
//     //         setCost('');
//     //         setReason('');
//     //     } catch (error) {
//     //         console.error('Failed to submit request:', error);
//     //         setError('Failed to submit request. Please try again.');
//     //     }
//     // };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/requests`,
//                 { item, cost: parseFloat(cost), reason },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             onNewRequest(response.data);
//             setItem('');
//             setCost('');
//             setReason('');
//             setSuggestion(null);
//         } catch (error) {
//             console.error('Failed to submit request:', error);
//         }
//     };

//     const handleSuggestApproval = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/requests/suggest-approval`,
//                 { cost: parseFloat(cost) },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setSuggestion(response.data.suggested_approval ? 'Approval suggested' : 'Rejection suggested');
//         } catch (error) {
//             console.error('Failed to get suggestion:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//         <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item</label>
//         <input
//         type="text"
//         id="item"
//         value={item}
//         onChange={(e) => setItem(e.target.value)}
//         required
//         className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//         </div>
//         <div>
//         <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
//         <input
//         type="number"
//         id="cost"
//         value={cost}
//         onChange={(e) => setCost(e.target.value)}
//         required
//         className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//         </div>
//         <div>
//         <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
//         <textarea
//         id="reason"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//         required
//         className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//         </div>
//         {message && <div className="text-green-600">{message}</div>}
//         {error && <div className="text-red-600">{error}</div>}
//         <button
//         type="button"
//         onClick={handleSuggestApproval}
//         className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
//         >
//         Suggest Approval
//         </button>
//         {suggestion && (
//             <div className="mt-2 text-sm font-medium text-gray-600">
//             {suggestion}
//             </div>
//         )}
//         <button
//         type="submit"
//         className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//         Submit Request
//         </button>
//         </form>
//     );
// };

// export default RequestForm;

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
    const [suggestion, setSuggestion] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/requests`,
                { item, cost: parseFloat(cost), reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Request submitted successfully');
            onNewRequest(response.data);
            setItem('');
            setCost('');
            setReason('');
            setSuggestion(null);
        } catch (error) {
            console.error('Failed to submit request:', error);
            setError('Failed to submit request. Please try again.');
        }
    };
    
    const handleSuggestApproval = async () => {
        if (!cost) {
            setError('Please enter a cost before requesting a suggestion.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/requests/suggest-approval`,
                { cost: parseFloat(cost) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuggestion(response.data.suggested_approval ? 'Approval suggested' : 'Rejection suggested');
            setError('');
        } catch (error) {
            console.error('Failed to get suggestion:', error);
            setError('Failed to get suggestion. Please try again.');
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
        type="button"
        onClick={handleSuggestApproval}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
        Suggest Approval
        </button>
        {suggestion && (
            <div className="mt-2 text-sm font-medium text-gray-600">
            {suggestion}
            </div>
        )}
        <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
        Submit Request
        </button>
        </form>
    );
};

export default RequestForm;