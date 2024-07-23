import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/api/register`, { username, password });
            
            if (response.status === 201) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setIsError(true);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    setMessage('Username already exists. Please choose a different username.');
                } else {
                    setMessage(error.response.data.error || 'An error occurred during registration.');
                }
            } else {
                setMessage('An unexpected error occurred. Please try again.');
            }
            console.error('Registration failed:', error);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
        <div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="-space-y-px rounded-md shadow-sm">
        <div>
        <label htmlFor="username" className="sr-only">Username</label>
        <input
        id="username"
        name="username"
        type="text"
        required
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input
        id="password"
        name="password"
        type="password"
        required
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        </div>
        <div>
        <button
        type="submit"
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Register
        </button>
        </div>
        </form>
        {message && (
            <div className={`mt-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
            </div>
        )}
        </div>
        </div>
    );
};

export default Register;