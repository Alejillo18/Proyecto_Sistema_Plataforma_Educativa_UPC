import { Router } from 'express';
import { getCareers, getSubjectsByCareer, associateCareersWithUser } from '../controllers/careerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/', getCareers);


router.get('/:careerId/subjects', getSubjectsByCareer);

router.post('/associate', protect, associateCareersWithUser);

export default router;