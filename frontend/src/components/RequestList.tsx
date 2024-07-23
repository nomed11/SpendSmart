import React from 'react';
import { Request } from './Dashboard';

interface RequestListProps {
    requests: Request[];
}

const RequestList: React.FC<RequestListProps> = ({ requests }) => {
    return (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Item</th>
        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Cost</th>
        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reason</th>
        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {requests.length > 0 ? (
            requests.map((request) => (
                <tr key={request.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{request.item}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${request.cost.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{request.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {request.status}
                </span>
                </td>
                </tr>
            ))
        ) : (
            <tr>
            <td colSpan={4} className="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap">No requests found</td>
            </tr>
        )}
        </tbody>
        </table>
        </div>
    );
};

export default RequestList;