export interface PricingTier {
  id: string;
  name: string;
  role: 'licensee' | 'reseller';
  price: number;
  features: string[];
  stripePriceId: string;
}

export interface SubscriptionStatus {
  status: 'active' | 'canceled' | 'none';
  role: 'user' | 'licensee' | 'reseller';
  stripeCustomerId?: string;
}

export interface PaymentError {
  message: string;
  code?: string;
}
