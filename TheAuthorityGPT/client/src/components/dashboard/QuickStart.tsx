import React from 'react';

const steps = [
  { id: 1, title: 'Create your first prompt', completed: false },
  { id: 2, title: 'Explore the Download Vault', completed: false },
  { id: 3, title: 'Check out the latest expansions', completed: false },
  { id: 4, title: 'Save a prompt to your history', completed: false },
];

export default function QuickStart() {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-navy-200">
      <h2 className="text-2xl font-bold text-navy-900 mb-4">Quick Start Checklist</h2>
      <div className="space-y-4">
        {steps.map(step => (
          <div key={step.id} className="flex items-center">
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => {}}
              className="h-5 w-5 text-yellow-500 rounded border-navy-300"
            />
            <span className="ml-3 text-navy-700">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
