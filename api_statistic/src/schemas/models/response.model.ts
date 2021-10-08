import ResponseStatus from "../types/response.status";

interface ResponseModel {
    responseStatus: ResponseStatus,
    message: string,
    data: string
}

export default ResponseModel;