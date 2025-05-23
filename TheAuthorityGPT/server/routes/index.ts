import { Router } from 'express';
import userRoutes from './user.routes';
import promptRoutes from './prompt.routes';
import downloadRoutes from './download.routes';
import expansionRoutes from './expansion.routes';
import adminRoutes from './admin.routes';
import stripeRoutes from './stripe.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/prompts', promptRoutes);
router.use('/downloads', downloadRoutes);
router.use('/expansions', expansionRoutes);
router.use('/admin', adminRoutes);
router.use('/stripe', stripeRoutes);

export default router;
