import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ApprovalInterface from './components/ApprovalInterface';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <main>
    <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/approval" element={<ApprovalInterface />} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </div>
    </main>
    </div>
  );
}

export default App;
