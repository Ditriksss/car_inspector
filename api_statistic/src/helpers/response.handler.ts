import ResponseModel from "schemas/models/response.model"
import ResponseStatus from "schemas/types/response.status"

export function handleErrorResponse (message: string, data: string = ''): ResponseModel {
    return handleResponse(ResponseStatus.Error, message, data);
}

export function handleSuccessResponse (message: string, data: string = ''): ResponseModel {
    return handleResponse(ResponseStatus.Success, message, data);
}

const handleResponse = (responseStatus: ResponseStatus, message: string, data: string): ResponseModel => {
    const response: ResponseModel = {
        responseStatus,
        message,
        data
    };

    return response;
}