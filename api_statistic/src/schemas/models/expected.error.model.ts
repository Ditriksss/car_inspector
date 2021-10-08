interface ExpectedError {
    discriminator: 'expectedError';
    statusCode: number,
    message: string
}

export function getExpectedError(statusCode: number, message: string): ExpectedError  {
    return {
        discriminator: 'expectedError',
        statusCode: statusCode,
        message: message
    };
}

export default ExpectedError;