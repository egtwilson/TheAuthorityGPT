import React from 'react';
import { Link } from 'react-router-dom';
import { ChecklistItem } from '../../types/onboarding';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface Props {
  items: ChecklistItem[];
  onComplete: (itemId: string) => void;
}

export default function OnboardingChecklist({ items, onComplete }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center p-4 rounded-lg border-2 
            ${item.completed 
              ? 'border-green-200 bg-green-50' 
              : 'border-navy-200 hover:border-navy-300'}`}
        >
          <div className="flex-1">
            <h3 className="text-lg font-medium text-navy-900">
              {item.title}
            </h3>
            <p className="text-navy-600">{item.description}</p>
          </div>
          
          <Link
            to={item.path}
            onClick={() => !item.completed && onComplete(item.id)}
            className={`flex items-center px-4 py-2 rounded-lg
              ${item.completed
                ? 'text-green-700 bg-green-100'
                : 'text-white bg-yellow-500 hover:bg-yellow-600'}`}
          >
            {item.completed ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <>
                Start
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
