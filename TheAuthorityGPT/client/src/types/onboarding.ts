export interface OnboardingProgress {
  userId: string;
  completedProfile: boolean;
  visitedPromptEngine: boolean;
  downloadedFile: boolean;
  openedVault: boolean;
  upgradeViewed: boolean;
}

export interface ChecklistItem {
  id: keyof Omit<OnboardingProgress, 'userId'>;
  title: string;
  description: string;
  path: string;
  completed: boolean;
}
