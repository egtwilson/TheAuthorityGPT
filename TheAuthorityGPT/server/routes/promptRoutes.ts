import { Router } from 'express';
import { generatePromptVariations, getPromptHistory } from '../controllers/promptController';

const router = Router();

router.post('/generate', generatePromptVariations);
router.get('/history/:userId', getPromptHistory);

export default router;
