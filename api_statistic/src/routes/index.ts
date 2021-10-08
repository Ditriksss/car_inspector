import { Router, Request, Response } from 'express';
import cars_route from './cars.routes';
import statistics_route from './statistics.routes'

const router: Router = Router();

router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
router.use('/statistics', statistics_route);
router.use('/cars', cars_route);

export default router;