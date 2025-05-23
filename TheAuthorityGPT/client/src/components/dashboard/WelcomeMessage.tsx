import React from 'react';
import { User } from '../../types/user';
import RoleBadge from './RoleBadge';

interface WelcomeMessageProps {
  user: User | null;
}

export default function WelcomeMessage({ user }: WelcomeMessageProps) {
  if (!user) return null;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">
            Here's your AI command center. What would you like to do today?
          </p>
        </div>
        <RoleBadge role={user.role} />
      </div>
    </div>
  );
}
