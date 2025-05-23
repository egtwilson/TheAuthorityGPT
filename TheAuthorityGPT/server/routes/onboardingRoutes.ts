import { Router } from 'express';
import { 
  getOnboardingProgress,
  updateOnboardingProgress
} from '../controllers/onboardingController';

const router = Router();

router.get('/:userId/progress', getOnboardingProgress);
router.post('/:userId/progress', updateOnboardingProgress);

export default router;
