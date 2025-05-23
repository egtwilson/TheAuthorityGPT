import { Request, Response } from 'express';
import { OnboardingProgress } from '../../client/src/types/onboarding';

// Mock data store - replace with database
const progressStore: Record<string, OnboardingProgress> = {};

export const getOnboardingProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Initialize progress if not exists
    if (!progressStore[userId]) {
      progressStore[userId] = {
        userId,
        completedProfile: false,
        visitedPromptEngine: false,
        downloadedFile: false,
        openedVault: false,
        upgradeViewed: false
      };
    }
    
    res.json(progressStore[userId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch onboarding progress' });
  }
};

export const updateOnboardingProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const update = req.body;
    
    // Update progress
    progressStore[userId] = {
      ...progressStore[userId],
      ...update
    };
    
    // Mock email trigger logic
    if (shouldTriggerEmail(update)) {
      await mockEmailTrigger(userId, update);
    }
    
    res.json(progressStore[userId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update onboarding progress' });
  }
};

const shouldTriggerEmail = (update: Partial<OnboardingProgress>): boolean => {
  // Logic to determine if email should be triggered
  return !!(update.completedProfile || update.downloadedFile);
};

const mockEmailTrigger = async (userId: string, update: Partial<OnboardingProgress>) => {
  // Placeholder for GetResponse API integration
  console.log(`Would trigger email for user ${userId}`, update);
  
  /* 
  Future GetResponse integration:
  
  const getResponseApi = new GetResponse(API_KEY);
  await getResponseApi.contacts.upsert({
    email: user.email,
    customFields: {
      onboardingStep: determineStep(update)
    }
  });
  */
};
