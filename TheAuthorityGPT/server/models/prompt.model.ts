import mongoose, { Document, Schema } from 'mongoose';
import { PromptCategory } from '../types/prompt.types';

export interface IPromptHistory extends Document {
  user_id: string;
  input_goal: string;
  category: PromptCategory;
  generated_prompts: string[];
  created_at: Date;
}

const PromptHistorySchema = new Schema<IPromptHistory>({
  user_id: { type: String, required: true },
  input_goal: { type: String, required: true },
  category: { type: String, required: true },
  generated_prompts: [{ type: String }],
  created_at: { type: Date, default: Date.now }
});

export const PromptHistory = mongoose.model<IPromptHistory>('PromptHistory', PromptHistorySchema);
