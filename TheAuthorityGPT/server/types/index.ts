export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'licensee' | 'reseller' | 'admin';
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
