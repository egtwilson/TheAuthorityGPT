import mongoose, { Document, Schema } from 'mongoose';

export interface IExpansionDrop extends Document {
  title: string;
  description: string;
  content: string;
  releaseDate: Date;
  requiredRole: 'licensee' | 'reseller';
  isActive: boolean;
  created_at: Date;
}

const ExpansionDropSchema = new Schema<IExpansionDrop>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  requiredRole: { 
    type: String, 
    enum: ['licensee', 'reseller'],
    required: true
  },
  isActive: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IExpansionDrop>('ExpansionDrop', ExpansionDropSchema);
