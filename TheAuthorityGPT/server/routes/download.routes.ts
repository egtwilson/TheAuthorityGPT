import { Router } from 'express';
import { DownloadController } from '../controllers/download.controller';

const router = Router();
const controller = new DownloadController();

router.get('/', controller.getDownloads);
router.get('/:id', controller.getDownloadById);
router.post('/', controller.createDownload);
router.put('/:id', controller.updateDownload);
router.delete('/:id', controller.deleteDownload);

export default router;
