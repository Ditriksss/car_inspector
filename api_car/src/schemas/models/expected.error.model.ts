interface ExpectedError {
    discriminator: 'expectedError';
    statusCode: number,
    message: string,
    details: any
}

export function getExpectedError(statusCode: number, message: string, details: any): ExpectedError  {
    return <ExpectedError>{
        discriminator: 'expectedError',
        statusCode: statusCode,
        message: message,
        details: details
    };
}

export default ExpectedError;