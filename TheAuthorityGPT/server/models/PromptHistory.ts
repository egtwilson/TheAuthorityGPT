import mongoose, { Document, Schema } from 'mongoose';

export interface IPromptHistory extends Document {
  userId: Schema.Types.ObjectId;
  prompt: string;
  category: string;
  result: string;
  created_at: Date;
}

const PromptHistorySchema = new Schema<IPromptHistory>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  category: { type: String, required: true },
  result: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IPromptHistory>('PromptHistory', PromptHistorySchema);
