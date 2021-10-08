import { Request, Response, NextFunction } from "express";
import logger from '../logger';
import { handleErrorResponse } from '../helpers/response.handler';
import ExpectedError from "schemas/models/expected.error.model";

const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(instanceofExpectedError(err)) {
        logger.error(err.message)
        res.status(err.statusCode).send(handleErrorResponse(err.message));
    } else if(err instanceof Error) {
        logger.error(err);
        res.status(500).send(handleErrorResponse('Server error. Please contact with support.'));
    } else {
        logger.error(`Unexpected server behaviur: ${err}`);
        res.status(500).send(handleErrorResponse('Unexpected server behaviur. Please contact with support.'));
    }
}

const instanceofExpectedError = (err: any): err is ExpectedError => {
    return err.discriminator === 'expectedError';
}

export default handleError;