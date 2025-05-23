import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/prompt-engine', label: 'Prompt Engine', icon: '⚡' },
    { path: '/downloads', label: 'Downloads', icon: '⬇️' },
    { path: '/vault', label: 'Vault', icon: '🗄️', minRole: 'licensee' },
    { path: '/upgrade', label: 'Upgrade', icon: '⭐' },
    { path: '/admin', label: 'Admin', icon: '⚙️', minRole: 'admin' }
  ];

  return (
    <aside className="w-64 bg-navy-900 text-white min-h-screen p-4">
      <div className="space-y-4">
        {navItems.map((item) => {
          if (item.minRole && (!user || !isRoleAuthorized(user.role, item.minRole))) {
            return null;
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-yellow-500 text-navy-900' 
                  : 'hover:bg-navy-700'}`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

function isRoleAuthorized(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    admin: 4,
    reseller: 3,
    licensee: 2,
    user: 1
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
