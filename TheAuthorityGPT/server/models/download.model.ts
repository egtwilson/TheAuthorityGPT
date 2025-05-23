import mongoose, { Document, Schema } from 'mongoose';

export interface IDownloadFile extends Document {
  title: string;
  description: string;
  file_url: string;
  category: string;
  access_roles: string[];
  uploaded_by: string;
  upload_date: Date;
  downloads_count: number;
}

const DownloadFileSchema = new Schema<IDownloadFile>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  file_url: { type: String, required: true },
  category: { type: String, required: true },
  access_roles: [{ type: String }],
  uploaded_by: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
  downloads_count: { type: Number, default: 0 }
});

export const DownloadFile = mongoose.model<IDownloadFile>('DownloadFile', DownloadFileSchema);
