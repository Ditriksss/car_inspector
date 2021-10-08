import express, { Application } from "express";
import router from './routes/';
import handleError from "./middlewares/error.handler.middleware";

const createServer = (): Application => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use('/api', router);
    
    app.use(handleError);
    
    return app;
}

export default createServer;