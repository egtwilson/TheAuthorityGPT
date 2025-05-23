import { Router } from 'express';
import {
  getExpansions,
  getExpansionById,
  createExpansion,
  updateExpansion,
  deleteExpansion
} from '../controllers/expansionController';

const router = Router();

router.get('/', getExpansions);
router.get('/:id', getExpansionById);
router.post('/', createExpansion);
router.put('/:id', updateExpansion);
router.delete('/:id', deleteExpansion);

export default router;
