import { Router, Request, Response } from 'express';
import { getCarData, getCarsData, initResponseData, postCars, postStatistics, shareCars } from 'controllers/gateway.controller';
import handleSuccessWithOkStatus from 'middlewares/success.handler.middleware';

const router: Router = Router();

router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
router.post("/cars", initResponseData, postCars, shareCars, postStatistics, handleSuccessWithOkStatus);
router.get("/cars/preview/all", initResponseData, getCarsData, handleSuccessWithOkStatus);
router.get("/cars/preview", initResponseData, getCarData, handleSuccessWithOkStatus);

export default router;