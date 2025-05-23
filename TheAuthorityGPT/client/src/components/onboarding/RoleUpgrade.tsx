import React from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

export default function RoleUpgrade() {
  return (
    <div className="bg-gradient-to-r from-navy-50 to-navy-100 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-navy-900">
            Upgrade Your Experience
          </h3>
          <p className="mt-2 text-navy-600">
            Get access to premium features, monthly expansions, and exclusive content
            by upgrading to Licensee or Reseller.
          </p>
          <button
            className="mt-4 px-6 py-2 bg-navy-600 text-white rounded-lg
              hover:bg-navy-700 transition-colors flex items-center"
          >
            View Upgrade Options
            <ArrowUpCircleIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
