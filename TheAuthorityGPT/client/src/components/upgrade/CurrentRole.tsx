import React from 'react';
import { User } from '../../types/user';
import RoleBadge from '../dashboard/RoleBadge';

// Mock user - replace with actual user context
const mockUser: User = {
  id: '1',
  firstName: 'John',
  role: 'user',
  notifications: []
};

export default function CurrentRole() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-navy-900">
        Upgrade Your Access
      </h1>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <span className="text-navy-600">Current Role:</span>
        <RoleBadge role={mockUser.role} />
      </div>
      <p className="mt-3 text-navy-600">
        Choose your upgrade option below to unlock more features and capabilities.
      </p>
    </div>
  );
}
