import mongoose, { Document, Schema } from 'mongoose';

export interface IDownloadFile extends Document {
  name: string;
  description: string;
  fileUrl: string;
  category: string;
  requiredRole: 'user' | 'licensee' | 'reseller';
  downloadCount: number;
  created_at: Date;
}

const DownloadFileSchema = new Schema<IDownloadFile>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  category: { type: String, required: true },
  requiredRole: { 
    type: String, 
    enum: ['user', 'licensee', 'reseller'],
    default: 'user'
  },
  downloadCount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IDownloadFile>('DownloadFile', DownloadFileSchema);
