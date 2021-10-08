import createServer from './server';
import config from './config'
import { Application } from 'express';
import logger from './logger'

const port = config.port;
const host = config.host;

const startServer = () =>  {
    const app: Application = createServer();

    app.listen(port as number, host, () => {
        logger.info(`Server listing at http://${host}:${port}`);
    });
}

startServer();