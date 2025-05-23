import { Router } from 'express';
import {
  uploadFile,
  scheduleExpansion,
  manageUserRoles
} from '../controllers/adminController';

const router = Router();

router.post('/upload', uploadFile);
router.post('/expansions/schedule', scheduleExpansion);
router.put('/users/:userId/role', manageUserRoles);

export default router;
