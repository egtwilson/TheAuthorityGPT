import { Router } from 'express';
import {
  createCheckoutSession,
  verifyPayment,
  handleStripeWebhook
} from '../controllers/paymentController';

const router = Router();

router.post('/create-checkout-session', createCheckoutSession);
router.get('/verify-payment/:sessionId', verifyPayment);
router.post('/webhook', handleStripeWebhook);

export default router;
