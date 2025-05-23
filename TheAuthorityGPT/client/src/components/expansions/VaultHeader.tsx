import React from 'react';

interface Props {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export default function VaultHeader({ selectedYear, onYearChange }: Props) {
  const years = ['2024', '2025'];

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Expansion Vault</h1>
        <p className="text-navy-600 mt-2">
          Access your monthly expansion packs and templates
        </p>
      </div>
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="rounded-lg border-2 border-navy-200 px-4 py-2 bg-white text-navy-900
          focus:outline-none focus:border-navy-500"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
