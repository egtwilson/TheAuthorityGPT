import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeMessage from './dashboard/WelcomeMessage';
import QuickStart from './dashboard/QuickStart';
import NavigationCard from './dashboard/NavigationCard';
import NotificationArea from './dashboard/NotificationArea';
import RoleBadge from './dashboard/RoleBadge';

const mockUser = {
  id: '1',
  firstName: 'John',
  role: 'user' as const,
  notifications: [
    { id: '1', message: 'New content available in the Expansion Vault!', date: '2023-05-20', read: false }
  ]
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <WelcomeMessage firstName={mockUser.firstName} />
          <RoleBadge role={mockUser.role} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NavigationCard
            title="Prompt Engine"
            description="Create and manage your AI prompts"
            icon="🤖"
            onClick={() => navigate('/prompt-engine')}
          />
          <NavigationCard
            title="Download Vault"
            description="Access your downloaded resources"
            icon="📥"
            onClick={() => navigate('/downloads')}
          />
          <NavigationCard
            title="Expansion Vault"
            description="Explore additional content and features"
            icon="🎁"
            onClick={() => navigate('/vault')}
          />
          <NavigationCard
            title="My History"
            description="View your saved prompts and activities"
            icon="📜"
            onClick={() => navigate('/history')}
          />
          {mockUser.role === 'user' && (
            <NavigationCard
              title="Upgrade to Licensee"
              description="Get access to exclusive features"
              icon="⭐"
              onClick={() => navigate('/upgrade')}
              className="bg-yellow-50 border-yellow-500"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickStart />
          </div>
          <div>
            <NotificationArea notifications={mockUser.notifications} />
          </div>
        </div>
      </div>
    </div>
  );
}
