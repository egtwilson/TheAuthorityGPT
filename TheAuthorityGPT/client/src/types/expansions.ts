import { UserRole } from './downloads';

export interface ExpansionDrop {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  releaseDate: string;
  accessRoles: UserRole[];
  uploadedBy: string;
  createdAt: string;
  status: 'scheduled' | 'released' | 'draft';
}

export interface DropSchedulerForm {
  title: string;
  description: string;
  file: File | null;
  releaseDate: string;
  accessRoles: UserRole[];
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  dropId?: string;
}
