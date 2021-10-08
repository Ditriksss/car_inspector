import { Router } from 'express';
import { getStatistic, getStatistics, postStatistics } from '../controllers/statistics.controller';
import handleSuccessWithOkStatus from '../middlewares/success.handler.middleware';

const router = Router();

router.post('/', postStatistics, handleSuccessWithOkStatus);
router.get('/preview/all', getStatistics, handleSuccessWithOkStatus);
router.get('/preview', getStatistic, handleSuccessWithOkStatus);
export default router;