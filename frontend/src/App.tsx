import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ApprovalInterface from './components/ApprovalInterface';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

const App: React.FC = () => {
	return (
		<div className="App">
		<Header />
		<main className="pt-24"> {/* Add padding-top to account for the fixed header */}
		<Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route element={<ProtectedRoute />}>
		<Route path="/dashboard" element={<Dashboard />} />
		<Route path="/approval" element={<ApprovalInterface />} />
		<Route path="/" element={<Dashboard />} />
		</Route>
		</Routes>
		</main>
		</div>
	);
};

export default App;