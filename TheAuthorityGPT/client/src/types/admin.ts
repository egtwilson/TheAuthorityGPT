import { UserRole } from './user';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: string;
  lastActive: string;
}

export interface RoleUpdateResponse {
  success: boolean;
  message: string;
  user?: AdminUser;
}
