import React, { useState } from 'react';
import { FileCategory, DownloadableFile } from '../../types/downloads';
import FileGrid from './FileGrid';
import CategoryFilter from './CategoryFilter';

// Mock data - replace with API call later
const mockFiles: DownloadableFile[] = [
  {
    id: '1',
    filename: 'prompt-toolkit-v1.pdf',
    url: '/files/prompt-toolkit-v1.pdf',
    title: 'Prompt Engineering Toolkit',
    description: 'Essential templates and frameworks for crafting effective prompts.',
    category: 'Toolkits',
    accessRoles: ['user', 'licensee', 'reseller'],
    uploadDate: '2023-05-01',
    thumbnailUrl: '/thumbnails/toolkit.png'
  },
  {
    id: '2',
    filename: 'business-prompts.pdf',
    url: '/files/business-prompts.pdf',
    title: 'Business Prompt Collection',
    description: 'Premium collection of business-focused prompts.',
    category: 'Templates',
    accessRoles: ['licensee', 'reseller'],
    uploadDate: '2023-05-15',
    thumbnailUrl: '/thumbnails/business.png'
  },
  {
    id: '3',
    filename: 'quality-checklist.pdf',
    url: '/files/quality-checklist.pdf',
    title: 'Prompt Quality Checklist',
    description: 'Ensure your prompts meet professional standards.',
    category: 'Checklists',
    accessRoles: ['user', 'licensee', 'reseller'],
    uploadDate: '2023-05-10',
    thumbnailUrl: '/thumbnails/checklist.png'
  }
];

// Mock user - replace with actual user context later
const mockUser = {
  role: 'user' as const
};

export default function DownloadVault() {
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | 'All'>('All');

  const filteredFiles = selectedCategory === 'All'
    ? mockFiles
    : mockFiles.filter(file => file.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Download Vault</h1>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <FileGrid files={filteredFiles} userRole={mockUser.role} />
      </div>
    </div>
  );
}
