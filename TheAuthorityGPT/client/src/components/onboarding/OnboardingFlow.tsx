import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { ChecklistItem } from '../../types/onboarding';
import WelcomeHeader from './WelcomeHeader';
import OnboardingChecklist from './OnboardingChecklist';
import RoleUpgrade from './RoleUpgrade';

// Mock user data - replace with actual user context
const mockUser: User = {
  id: '1',
  firstName: 'John',
  role: 'user',
  notifications: []
};

const initialChecklist: ChecklistItem[] = [
  {
    id: 'completedProfile',
    title: 'Complete Your Profile',
    description: 'Add your details to personalize your experience',
    path: '/profile',
    completed: false
  },
  {
    id: 'visitedPromptEngine',
    title: 'Visit the Prompt Engine',
    description: 'Explore our powerful prompt creation tools',
    path: '/prompt-engine',
    completed: false
  },
  {
    id: 'downloadedFile',
    title: 'Download Your First Resource',
    description: 'Get started with our premium templates',
    path: '/downloads',
    completed: false
  },
  {
    id: 'openedVault',
    title: 'Explore the Expansion Vault',
    description: 'Discover monthly content updates',
    path: '/vault',
    completed: false
  },
  {
    id: 'upgradeViewed',
    title: 'Upgrade Your Access',
    description: 'Unlock premium features and content',
    path: '/upgrade',
    completed: false
  }
];

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(initialChecklist);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const isAllCompleted = checklist.every(item => item.completed);
    setAllCompleted(isAllCompleted);
  }, [checklist]);

  const handleItemComplete = async (itemId: string) => {
    const updatedChecklist = checklist.map(item =>
      item.id === itemId ? { ...item, completed: true } : item
    );
    setChecklist(updatedChecklist);

    // Mock API call to update progress
    try {
      await mockUpdateProgress(itemId);
      // Placeholder for email trigger
      if (shouldTriggerEmail(itemId)) {
        await mockEmailTrigger(itemId);
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const mockUpdateProgress = async (itemId: string) => {
    // Simulate API call to update progress
    console.log(`Updating progress for ${itemId}`);
  };

  const mockEmailTrigger = async (itemId: string) => {
    // Placeholder for GetResponse API integration
    console.log(`Triggering email for ${itemId}`);
  };

  const shouldTriggerEmail = (itemId: string): boolean => {
    // Logic to determine if email should be triggered
    return ['completedProfile', 'downloadedFile'].includes(itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <WelcomeHeader user={mockUser} />
        
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <OnboardingChecklist 
            items={checklist}
            onComplete={handleItemComplete}
          />
          
          {mockUser.role === 'user' && (
            <div className="mt-8">
              <RoleUpgrade />
            </div>
          )}
          
          {allCompleted && (
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg
                  hover:bg-yellow-600 transition-colors font-medium"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
