import axios, { AxiosResponse } from 'axios';
import logger from 'logger';
import GatewayError from 'schemas/models/gateway.error.model';

export async function post(url: string, data: any, expectedStatuses: number[]): Promise<any> {
    let response: AxiosResponse<any>;

    try {
        response = await axios.post<any>(url, data);
    } catch (error) {
        catchError(error, url);
    }

    handleResponse(response, expectedStatuses);
    return response.data;
}

export async function get(url: string, expectedStatuses: number[]): Promise<any> {
    let response: AxiosResponse<any>;

    try {
        response = await axios.get<any>(url);
    } catch (error) {
        catchError(error, url);
    }

    handleResponse(response, expectedStatuses);
    return response.data;
}

function catchError(error: any, url: string) {
    if(axios.isAxiosError(error)) {
        if(error.response) {
            logger.info(`Get error from ${url} with response.`)
            const gatewayError: GatewayError = new GatewayError(error.response.data, error.response.status);
            logger.info(typeof gatewayError)
            throw gatewayError;
        } else if (error.request) {
            logger.info(`Get error from ${url} without response.`)
            const gatewayError: GatewayError = new GatewayError('Empty response.', 500);
            throw gatewayError;
        }
    }

    logger.info(`Get unexpected error from ${url}.`)
    throw error;
}

function handleResponse(response: AxiosResponse<any>, expectedStatuses: number[], isDataRequired: boolean = true) {
    if(!expectedStatuses.includes(response.status)) {
        const error: GatewayError = new GatewayError(response.data, response.status);
        throw error;
    }
}