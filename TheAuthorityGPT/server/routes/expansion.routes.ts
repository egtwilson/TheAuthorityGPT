import { Router } from 'express';
import { ExpansionController } from '../controllers/expansion.controller';

const router = Router();
const controller = new ExpansionController();

router.get('/', controller.getExpansions);
router.get('/:id', controller.getExpansionById);
router.post('/', controller.createExpansion);
router.put('/:id', controller.updateExpansion);
router.delete('/:id', controller.deleteExpansion);

export default router;
