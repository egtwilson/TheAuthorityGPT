import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import RoleBadge from '../dashboard/RoleBadge';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              className="h-8 w-auto" 
              src="/logo.svg" 
              alt="Logo" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <RoleBadge role={user?.role || 'user'} />
            <button
              onClick={() => logout()}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
