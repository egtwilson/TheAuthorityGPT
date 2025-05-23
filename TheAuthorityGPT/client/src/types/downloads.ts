export type FileCategory = 'Toolkits' | 'Checklists' | 'Templates';
export type UserRole = 'user' | 'licensee' | 'reseller' | 'admin';

export interface DownloadableFile {
  id: string;
  filename: string;
  url: string;
  title: string;
  description: string;
  category: FileCategory;
  accessRoles: UserRole[];
  uploadDate: string;
  thumbnailUrl?: string;
}
