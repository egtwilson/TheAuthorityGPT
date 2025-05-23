import React from 'react';
import { useAuth } from '../hooks/useAuth';
import WelcomeMessage from '../components/dashboard/WelcomeMessage';
import NavigationCard from '../components/dashboard/NavigationCard';
import QuickStart from '../components/dashboard/QuickStart';
import NotificationArea from '../components/dashboard/NotificationArea';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <WelcomeMessage user={user} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NavigationCard
          title="Prompt Engine"
          description="Create powerful prompts with our AI engine"
          link="/prompt-engine"
          icon="⚡"
        />
        
        <NavigationCard
          title="Downloads"
          description="Access your downloadable resources"
          link="/downloads"
          icon="⬇️"
        />
        
        {user?.role !== 'user' && (
          <NavigationCard
            title="Vault"
            description="Exclusive content for licensees"
            link="/vault"
            icon="🗄️"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickStart />
        <NotificationArea />
      </div>
    </div>
  );
}
