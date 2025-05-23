import React from 'react';
import { PricingTier } from '../../types/payment';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  tiers: PricingTier[];
  onUpgrade: (tier: PricingTier) => void;
  loading: boolean;
}

export default function PricingOptions({ tiers, onUpgrade, loading }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className="bg-white rounded-lg shadow-sm p-6 border-2 border-navy-100
            hover:border-navy-200 transition-colors"
        >
          <h3 className="text-2xl font-bold text-navy-900">
            {tier.name}
          </h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-navy-900">
              ${tier.price}
            </span>
            <span className="text-navy-600">/month</span>
          </div>
          
          <ul className="mt-6 space-y-4">
            {tier.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="ml-3 text-navy-600">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onUpgrade(tier)}
            disabled={loading}
            className="mt-8 w-full px-6 py-3 bg-yellow-500 text-white rounded-lg
              hover:bg-yellow-600 transition-colors font-medium disabled:opacity-50
              disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Upgrade to ${tier.name}`}
          </button>
        </div>
      ))}
    </div>
  );
}
