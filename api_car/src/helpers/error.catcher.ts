import { NextFunction } from "express";
import { getExpectedError } from "schemas/models/expected.error.model";
import { ValidationError } from "yup";

export function catchError(error: any, next: NextFunction): void {
    if(error instanceof ValidationError) {
        return next(getExpectedError(502, "Wrong response from proxy server. Please contact with support.", error));
    }
    if(error instanceof Error && error.name === 'web') {
        return next(getExpectedError(502, "Error occurs during call to proxy server. Please contact with support.", error));
    }
    return next(error);
}