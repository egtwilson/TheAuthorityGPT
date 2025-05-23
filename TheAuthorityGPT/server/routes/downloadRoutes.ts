import { Router } from 'express';
import { 
  getDownloads,
  getDownloadById,
  createDownload,
  updateDownload,
  deleteDownload
} from '../controllers/downloadController';

const router = Router();

router.get('/', getDownloads);
router.get('/:id', getDownloadById);
router.post('/', createDownload);
router.put('/:id', updateDownload);
router.delete('/:id', deleteDownload);

export default router;
