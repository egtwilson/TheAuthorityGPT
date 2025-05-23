import React from 'react';
import { Navigate } from 'react-router-dom';
import FileUploadForm from '../components/admin/FileUploadForm';
import ExpansionScheduler from '../components/admin/ExpansionScheduler';
import UserRoleManager from '../components/admin/UserRoleManager';

// Mock admin check - replace with actual auth logic
const isAdmin = true; // Mock value

export default function AdminPage() {
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-8">
          Admin Panel
        </h1>
        
        <div className="space-y-8">
          <FileUploadForm />
          <ExpansionScheduler />
          <UserRoleManager />
        </div>
      </div>
    </div>
  );
}
