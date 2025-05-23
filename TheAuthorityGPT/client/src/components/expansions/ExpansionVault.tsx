import React, { useState } from 'react';
import { VaultItem } from '../../types/expansions';
import MonthlyDrops from './MonthlyDrops';
import VaultHeader from './VaultHeader';

// Mock data - replace with API call
const mockItems: VaultItem[] = [
  {
    id: '1',
    title: 'Advanced Prompt Templates',
    description: 'Premium collection of advanced prompt engineering templates.',
    url: '/files/may-templates.pdf',
    month: 'May 2024',
    releaseDate: '2024-05-01T00:00:00Z',
    accessRoles: ['licensee', 'reseller'],
    status: 'available',
    thumbnailUrl: '/thumbnails/may-templates.png'
  },
  {
    id: '2',
    title: 'June Expansion Pack',
    description: 'Exclusive prompts for business automation.',
    url: '/files/june-pack.pdf',
    month: 'June 2024',
    releaseDate: '2024-06-01T00:00:00Z',
    accessRoles: ['licensee', 'reseller'],
    status: 'locked',
    thumbnailUrl: '/thumbnails/june-pack.png'
  }
];

// Mock user - replace with actual user context
const mockUser = {
  role: 'licensee' as const
};

export default function ExpansionVault() {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  
  const filteredItems = mockItems.filter(item => 
    new Date(item.releaseDate).getFullYear().toString() === selectedYear
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VaultHeader selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <MonthlyDrops items={filteredItems} userRole={mockUser.role} />
      </div>
    </div>
  );
}
