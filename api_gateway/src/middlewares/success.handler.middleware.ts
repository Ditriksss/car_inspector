import { Request, Response } from "express";
import { handleSuccessResponse } from '../helpers/response.handler';

const handleSuccessWithOkStatus = (req: Request, res: Response) => {
    res.status(200).send(handleSuccessResponse(res.message, res.data));
}

export default handleSuccessWithOkStatus;