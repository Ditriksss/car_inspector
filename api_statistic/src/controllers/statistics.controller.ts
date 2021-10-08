import config from '../config';
import { get } from '../services/http.service';
import { getCarIdByVin, saveStatistics, getStatisticByVin, getAllStatistics } from '../services/database.service';
import { Request, Response, NextFunction } from "express";
import CarStatistics from 'schemas/dtos/car.statistics.dto';
import ExpectedError, { getExpectedError } from 'schemas/models/expected.error.model';
import Statistic from 'schemas/entities/statistic.entity';
import logger from 'logger';
import CarStatisticDTO from 'schemas/dtos/car.statistic.dto';

export async function postStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    let result: Array<CarStatistics> = new Array<CarStatistics>();
    let errorResult: Array<string> = new Array<string>();
    logger.info('postStatistics');
    try {
        for(let i: number = 1; i < 4; i++) {
            const response = await get(`${config.statistics_data_url}${i}`);
            const carStatistcs: CarStatistics = response;
            const carId: number = await getCarIdByVin(carStatistcs.vin);

            if(carId === 0) {
                errorResult.push(carStatistcs.vin);
            } else {
                await saveStatistics(carStatistcs, carId);
                result.push(carStatistcs);
            }
        }
    } catch(error) {
        return next(error);
    }
        if(errorResult.length > 0) {
            return next(getExpectedError(404, `Statistics for cars obtained from remote server with vin ${errorResult.join(', ')} cannot be found.`))
        }
        
        req.finalMessage = 'Successfully imported cars data!';
        req.finalData = result;

        return next();
}

export async function getStatistic(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vin = req.query.vin;

    if(!vin || vin === 'undefined') {
        return next(getExpectedError(400, "Vin not provided."))
    } 

    logger.info(`getStatistic: params vin = ${vin}`)
    let statistic: Statistic;
    try {
        statistic = await getStatisticByVin(vin as string);
    } catch(error) {
        return next(error);
    }

    if(!statistic) {
        return next(getExpectedError(404, `Not found any car with vin: ${vin}`))
    }

    req.finalMessage = "Get one element.";
    req.finalData = {
        vin,
        statistic
    };

    return next();
}

export async function getStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info(`getStatistics`)
    let statistics: CarStatisticDTO[];
    try {
        statistics = await getAllStatistics();
    } catch(error) {
        return next(error);
    }

    if(!statistics || !Array.isArray(statistics) || statistics.length === 0) {
        return next(getExpectedError(404, `There is no any cars.`))
    }

    req.finalMessage = `Get ${statistics.length} elements.`;
    req.finalData = statistics;
    return next();
}   