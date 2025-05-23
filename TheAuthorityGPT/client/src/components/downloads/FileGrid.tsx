import React from 'react';
import { DownloadableFile, UserRole } from '../../types/downloads';
import FileCard from './FileCard';

interface Props {
  files: DownloadableFile[];
  userRole: UserRole;
}

export default function FileGrid({ files, userRole }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map(file => (
        <FileCard
          key={file.id}
          file={file}
          hasAccess={file.accessRoles.includes(userRole)}
        />
      ))}
    </div>
  );
}
