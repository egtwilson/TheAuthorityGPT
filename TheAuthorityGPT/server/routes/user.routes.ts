import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth';
import { 
  createUser,
  getUser,
  updateUserRole,
  updateOnboardingProgress
} from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/:id', auth, getUser);
router.patch('/:id/role', auth, requireRole(['admin']), updateUserRole);
router.patch('/:id/onboarding', auth, updateOnboardingProgress);

export default router;
