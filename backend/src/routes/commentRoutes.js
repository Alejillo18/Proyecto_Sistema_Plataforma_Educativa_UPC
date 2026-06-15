import { Router } from 'express';
import { addComment, getCommentsByFile, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/file/:fileId', getCommentsByFile);

router.post('/file/:fileId', protect, addComment);

router.delete('/:commentId', protect, deleteComment);

export default router;