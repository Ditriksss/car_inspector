import { Request, Response } from "express";
import logger from "logger";
import { handleSuccessResponse } from '../helpers/response.handler';

const handleSuccessWithOkStatus = (req: Request, res: Response) => {
    logger.info(`Prepare response with message: ${req.finalMessage}`);
    res.status(200).send(handleSuccessResponse(req.finalMessage, req.finalData));
}

export default handleSuccessWithOkStatus;