import React from 'react';
import { UserRole } from '../../types/user';

interface RoleBadgeProps {
  role: UserRole;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const badges = {
    user: 'bg-gray-100 text-gray-800',
    licensee: 'bg-yellow-100 text-yellow-800',
    reseller: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800'
  };

  const labels = {
    user: 'Basic User',
    licensee: 'Licensed',
    reseller: 'Reseller',
    admin: 'Admin'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${badges[role]}`}>
      {labels[role]}
    </span>
  );
}
