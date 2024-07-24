import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between w-full py-6">
        <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
        SpendSmart
        </Link>
        <div className="hidden ml-10 space-x-8 lg:block">
        <Link to="/dashboard" className="text-base font-medium text-gray-500 hover:text-gray-900">
        Dashboard
        </Link>
        <Link to="/approval" className="text-base font-medium text-gray-500 hover:text-gray-900">
        Approvals
        </Link>
        </div>
        </div>
        <div className="ml-10 space-x-4">
        <button
        onClick={handleLogout}
        className="inline-block px-4 py-2 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-opacity-75"
        >
        Logout
        </button>
        </div>
        </div>
        </nav>
        </header>
    );
};

export default Header;