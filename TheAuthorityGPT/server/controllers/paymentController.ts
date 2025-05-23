import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const PRICE_IDS = {
  licensee: process.env.STRIPE_LICENSEE_PRICE_ID!,
  reseller: process.env.STRIPE_RESELLER_PRICE_ID!
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/upgrade?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/upgrade?canceled=true`,
      metadata: {
        userId: req.user?.id // Add user context from your auth middleware
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Update user role based on the purchased tier
      await updateUserRole(session.metadata.userId, session.subscription as string);
      
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature']!;
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(deletedSubscription);
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handling failed:', error);
    res.status(400).json({ error: 'Webhook handling failed' });
  }
};

// Helper functions - implement these based on your database schema
async function updateUserRole(userId: string, subscriptionId: string) {
  // Update user role in your database
  console.log(`Updating role for user ${userId} with subscription ${subscriptionId}`);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Handle subscription status changes
  console.log(`Handling subscription change: ${subscription.id}`);
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  // Handle subscription cancellation
  console.log(`Handling subscription cancellation: ${subscription.id}`);
}
