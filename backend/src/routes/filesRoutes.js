import { Router } from 'express';
import { 
  uploadFile, 
  getFilesBySubject, 
  downloadFile, 
  toggleLikeFile, 
  updateFile,
  deleteFile 
} from '../controllers/filesController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/subject/:subjectId', getFilesBySubject);


router.get('/:fileId/download', downloadFile);


router.post('/upload', protect, upload.single('file'), uploadFile);

router.post('/:fileId/like', protect, toggleLikeFile);


router.put('/:fileId', protect, updateFile);

router.delete('/:fileId', protect, deleteFile);

export default router;