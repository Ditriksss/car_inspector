import { Router } from 'express';
import { getCar, getCars, postCars, shareCars } from '../controllers/cars.controller';
import handleSuccessWithOkStatus from '../middlewares/success.handler.middleware';

const router = Router();

router.post('/', postCars, handleSuccessWithOkStatus);
router.post('/share', shareCars, handleSuccessWithOkStatus);
router.get('/preview/all', getCars, handleSuccessWithOkStatus);
router.get('/preview', getCar, handleSuccessWithOkStatus);

export default router;