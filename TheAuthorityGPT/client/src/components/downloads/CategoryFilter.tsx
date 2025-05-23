import React from 'react';
import { FileCategory } from '../../types/downloads';

const categories: (FileCategory | 'All')[] = ['All', 'Toolkits', 'Checklists', 'Templates'];

interface Props {
  selectedCategory: FileCategory | 'All';
  onCategoryChange: (category: FileCategory | 'All') => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: Props) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value as FileCategory | 'All')}
      className="rounded-lg border-2 border-navy-200 px-4 py-2 bg-white text-navy-900
        focus:outline-none focus:border-navy-500"
    >
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
