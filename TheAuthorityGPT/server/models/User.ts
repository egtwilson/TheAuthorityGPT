import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'licensee' | 'reseller';
  stripe_customer_id?: string;
  subscription_status: 'active' | 'inactive' | 'cancelled';
  onboarding_progress: {
    completed_profile: boolean;
    visited_prompt_engine: boolean;
    downloaded_file: boolean;
    opened_vault: boolean;
  };
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['user', 'licensee', 'reseller'],
    default: 'user'
  },
  stripe_customer_id: String,
  subscription_status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'inactive'
  },
  onboarding_progress: {
    completed_profile: { type: Boolean, default: false },
    visited_prompt_engine: { type: Boolean, default: false },
    downloaded_file: { type: Boolean, default: false },
    opened_vault: { type: Boolean, default: false }
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
