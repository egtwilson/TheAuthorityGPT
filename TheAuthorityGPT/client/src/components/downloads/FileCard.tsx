import React from 'react';
import { DownloadableFile } from '../../types/downloads';

interface Props {
  file: DownloadableFile;
  hasAccess: boolean;
}

export default function FileCard({ file, hasAccess }: Props) {
  const handleDownload = () => {
    // TODO: Implement actual download logic
    console.log(`Downloading ${file.filename}`);
  };

  return (
    <div className="bg-white rounded-lg border-2 border-navy-200 overflow-hidden">
      {file.thumbnailUrl && (
        <div className="h-48 bg-navy-100">
          <img
            src={file.thumbnailUrl}
            alt={file.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">
              {file.title}
            </h3>
            <p className="text-navy-600 mb-4">{file.description}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-navy-100 text-navy-800">
            {file.category}
          </span>
        </div>
        
        {hasAccess ? (
          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg
              hover:bg-yellow-600 transition-colors font-medium"
          >
            Download
          </button>
        ) : (
          <div className="text-center py-2 text-navy-600 bg-navy-50 rounded-lg">
            Upgrade to access this file
          </div>
        )}
      </div>
    </div>
  );
}
