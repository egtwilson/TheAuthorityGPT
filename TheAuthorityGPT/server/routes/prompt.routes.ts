import { Router } from 'express';
import { PromptController } from '../controllers/prompt.controller';

const router = Router();
const controller = new PromptController();

router.post('/generate', controller.generatePromptVariations);
router.get('/history/:userId', controller.getPromptHistory);

export default router;
