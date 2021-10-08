import { Request, Response, NextFunction } from "express";
import { get, post } from "services/http.service";
import config from "config";
import logger from "logger";

export async function initResponseData(req: Request, res: Response, next: NextFunction): Promise<void> {
    if(req.url === '/cars/preview/all') {
        res.data = {
            cars: []
        };
    } else if(req.url.startsWith('/cars/preview')) {
        res.data = {
            car: {}
        };
    } else if(req.url === '/cars/') {
        res.data = [];
    }

    return next();
}

export async function postCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    let response: any;
    logger.info(`Send request to cars: post to ${req.url}`)

    try {
        response = await post(`${config.api_cars_url}api/cars`, {}, [200])
    } catch(error) {
        return next(error);
    }

    logger.info('Received response from : post to ${req.url}')
    logger.trace(response);
    res.data.push(response);
    return next();
}

export async function shareCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    let response: any;
    logger.info(`Send request to cars: post to ${req.url}`)

    try {
        response = await post(`${config.api_cars_url}api/cars/share`, {}, [200])
    } catch(error) {
        return next(error);
    }

    logger.info(`Received response from : post to ${req.url}`)
    logger.trace(response);
    res.data.push(response);
    return next();
}

export async function postStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    let response: any;
    logger.info('Send request to cars: post to api/statistics')

    try {
    response = await post(`${config.api_statistics_url}api/statistics`, {}, [200])
    } catch(error) {
        return next(error);
    }

    logger.info('Received response from : post to api/statistics')
    logger.trace(response);
    res.data.push(response);
    res.message = 'Success filled data of cars and statistics.'
    return next();
}

export async function getCarData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vin = req.query.vin;

    logger.info(`Send request to cars: get to ${req.url}, vin = ${vin}`)
    let car: any;
    let statistic: any;
    try {
        car = (await get(`${config.api_cars_url}api/cars/preview?vin=${vin}`, [200])).data
        statistic = (await get(`${config.api_statistics_url}api/statistics/preview?vin=${vin}`, [200])).data
    } catch(error) {
        return next(error);
    }

    res.message = 'Get one car.';
    res.data.car.made = car.made;
    res.data.car.model = car.model;
    res.data.car.year = car.year;
    res.data.car.vin = car.vin;
    res.data.car.statistic = statistic;
    return next();
}

export async function getCarsData(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info(`Send request to cars: get to ${req.url}`)
    let cars: any[];
    let statistics: any[];
    try {
        cars = (await get(`${config.api_cars_url}api/cars/preview/all`, [200])).data
        statistics = (await get(`${config.api_statistics_url}api/statistics/preview/all`, [200])).data
    } catch(error) {
        return next(error);
    }

    const merged = mergeCarsAndStatistics(cars, statistics);
    logger.info(`request ${req.url} response => ${JSON.stringify(merged)}`)
    res.data = merged;
    res.message = `Get ${cars.length} car.`;

    return next();
}

const mergeCarsAndStatistics = (a1, a2) =>
a1.map(itm => ({
    ...a2.find((item) => (item.vin === itm.vin) && item),
    ...itm
}));