import { Router, Request, Response } from 'express';
import cars from './cars.routes';

const router: Router = Router();

router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
router.use('/cars', cars);

export default router;