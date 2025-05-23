export type UserRole = 'user' | 'licensee' | 'reseller' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  onboardingComplete: boolean;
}
