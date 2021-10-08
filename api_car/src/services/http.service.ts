import axios, { AxiosResponse } from 'axios';

export async function get(url: string, expectedStatuses: number[]): Promise<any> {
    let response: AxiosResponse<any>;
    try {
        response = await axios.get<any>(url);
    } catch(error) {
        if(axios.isAxiosError(error)) {
            error.name = "web";
            throw error;
        }

        throw error;
    }
    
    handleResponse(response, expectedStatuses);

    return response.data;
}

export async function post(url: string, data: any, expectedStatuses: number[]): Promise<any> {
    let response: AxiosResponse<any>;
    try {
        response = await axios.post<any>(url, data);
    } catch(error) {
        if(error instanceof Error) {
            error.name = 'web';
            throw error;
        }

        throw error;
    }

    handleResponse(response, expectedStatuses);

    return response.data;
}

function handleResponse(response: AxiosResponse<any>, expectedStatuses: number[], isDataRequired: boolean = true) {
    if(!response || (isDataRequired && !response.data)) {
        const error: Error = new Error('Empty response.');
        error.name = 'web';
        throw error;
    }

    if(!expectedStatuses.includes(response.status)) {
        const error: Error = new Error(`Wrong status. Received status: ${response.status} when expected: ${expectedStatuses.join(',')}.`);
        error.name = "web";
        throw error;
    }
}