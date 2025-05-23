import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

const router = Router();
const controller = new AdminController();

router.post('/upload', controller.uploadFile);
router.post('/expansions/schedule', controller.scheduleExpansion);
router.put('/users/:userId/role', controller.manageUserRoles);

export default router;
