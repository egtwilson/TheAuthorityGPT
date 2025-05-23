import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { PricingTier, PaymentError } from '../../types/payment';
import CurrentRole from './CurrentRole';
import PricingOptions from './PricingOptions';
import PaymentStatus from './PaymentStatus';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const pricingTiers: PricingTier[] = [
  {
    id: 'licensee',
    name: 'Licensee',
    role: 'licensee',
    price: 49,
    stripePriceId: 'price_licensee_monthly',
    features: [
      'Access to all prompt templates',
      'Monthly expansion updates',
      'Priority support',
      'Custom branding options'
    ]
  },
  {
    id: 'reseller',
    name: 'Reseller',
    role: 'reseller',
    price: 97,
    stripePriceId: 'price_reseller_monthly',
    features: [
      'Everything in Licensee',
      'Resell rights',
      'White label access',
      'Bulk export capabilities',
      'API access'
    ]
  }
];

export default function UpgradeFlow() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PaymentError | null>(null);

  useEffect(() => {
    // Check URL params for Stripe success/cancel status
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, []);

  const handleUpgrade = async (tier: PricingTier) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: tier.stripePriceId })
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (err) {
      setError({
        message: 'Failed to process upgrade. Please try again.',
        code: err instanceof Error ? err.message : 'unknown'
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/verify-payment/${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        navigate('/dashboard?upgrade=success');
      } else {
        setError({ message: 'Payment verification failed' });
      }
    } catch (err) {
      setError({ message: 'Failed to verify payment status' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurrentRole />
        
        <div className="mt-8">
          <PricingOptions 
            tiers={pricingTiers}
            onUpgrade={handleUpgrade}
            loading={loading}
          />
        </div>

        {error && (
          <PaymentStatus 
            error={error}
            onDismiss={() => setError(null)}
          />
        )}
      </div>
    </div>
  );
}
