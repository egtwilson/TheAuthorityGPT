import React from 'react';
import { VaultItem } from '../../types/expansions';

interface Props {
  item: VaultItem;
  hasAccess: boolean;
}

export default function VaultItemCard({ item, hasAccess }: Props) {
  const isLocked = item.status === 'locked';
  const releaseDate = new Date(item.releaseDate);
  const now = new Date();
  const daysUntilRelease = Math.ceil((releaseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const handleDownload = () => {
    // TODO: Implement actual download logic
    console.log(`Downloading ${item.title}`);
  };

  return (
    <div className="bg-white rounded-lg border-2 border-navy-200 overflow-hidden">
      {item.thumbnailUrl && (
        <div className="h-48 bg-navy-100">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-navy-900">{item.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {isLocked ? 'Locked' : 'Available'}
          </span>
        </div>
        
        <p className="text-navy-600 mb-4">{item.description}</p>
        
        {isLocked ? (
          <div className="text-center py-2 text-navy-600 bg-navy-50 rounded-lg">
            {hasAccess 
              ? `Unlocks in ${daysUntilRelease} days`
              : 'Upgrade to access this content'}
          </div>
        ) : (
          hasAccess ? (
            <button
              onClick={handleDownload}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg
                hover:bg-yellow-600 transition-colors font-medium"
            >
              Download
            </button>
          ) : (
            <div className="text-center py-2 text-navy-600 bg-navy-50 rounded-lg">
              Upgrade to access this content
            </div>
          )
        )}
      </div>
    </div>
  );
}
