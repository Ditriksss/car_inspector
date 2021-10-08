import { Router } from 'express';
import { postCars } from '../controllers/cars.controller';
import handleSuccessWithOkStatus from '../middlewares/success.handler.middleware';

const router = Router();

router.post('/', postCars, handleSuccessWithOkStatus);

export default router;