import { Request, Response, NextFunction } from "express";
import logger from '../logger';
import { handleErrorResponse } from '../helpers/response.handler';
import ExpectedError from "schemas/models/expected.error.model";
import GatewayError from "schemas/models/gateway.error.model";

const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof GatewayError) {
        logger.error(`Gateway error: ${JSON.stringify(err)}`);
        res.status(err.statusCode).send(err.data);
    } else {
        logger.error(err);
        res.status(500).send(handleErrorResponse('Unexpected server behaviur. Please contact with support.'));
    }
}

const instanceofExpectedError = (err: any): err is ExpectedError => {
    return err.discriminator === 'expectedError';
}

export default handleError;