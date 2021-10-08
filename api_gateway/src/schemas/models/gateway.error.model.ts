class GatewayError extends Error {
    data: any;
    statusCode: number;

    constructor(data: string, statusCode: number) {
        super();
        this.data = data;
        this.statusCode = statusCode;
    }
}

export default GatewayError;