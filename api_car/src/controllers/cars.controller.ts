import config from '../config';
import { get, post } from '../services/http.service';
import { saveCars, getCarInfos, getCarByVin, getAllCars } from '../services/database.service';
import { Request, Response, NextFunction } from "express";
import CarsDTO from '../schemas/dtos/cars.dto';
import CarInfo from 'schemas/dtos/car.info.dto';
import { validateCars } from 'helpers/validator';
import { mapDataToCarsDTO } from 'helpers/mapper';
import { getExpectedError } from 'schemas/models/expected.error.model';
import logger from 'logger';
import { catchError } from 'helpers/error.catcher';
import CarEntity from 'schemas/entities/car.entity';
import CarDTO from 'schemas/dtos/car.dto';

export async function postCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    logger.info('Method getCars executing')
    let savedCars: CarDTO[];
    try {
        const response = await get(config.cars_data_url, [200]);
        await validateCars(response);
        const carsData: CarsDTO = mapDataToCarsDTO(response);
        savedCars = await saveCars(carsData.cars);
    }
    catch(error) {
        return catchError(error, next);
    }
    finally {
        logger.info('Method getCars ended')
    }

    req.finalMessage = 'Successfully imported cars data!';
    req.finalData = savedCars;
    return next();
}

export async function shareCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    let infos: CarInfo[];
    try {
        infos = await getCarInfos();

        if(!infos || infos.length === 0) {
            return next(getExpectedError(404, `There is no any cars to share.`, {}))
        }

        await post(config.api_statistics_url, infos, [200]);
    } catch (error) {
        return catchError(error, next);
    }

    req.finalMessage = 'Successfully shared car infos!';
    req.finalData = infos.map(info => info.vin);
    return next();
}

export async function getCar(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vin = req.query.vin;

    if(!vin || vin === 'undefined') {
        return next(getExpectedError(400, "Vin not provided.", {}))
    } 

    logger.info(`getCar: params vin = ${vin}`)
    let car: CarEntity;
    try {
        car = await getCarByVin(vin as string);
    } catch(error) {
        return next(error);
    }

    if(!car) {
        return next(getExpectedError(404, `Not found any car with vin: ${vin}`, {}))
    }

    req.finalMessage = "Get one element.";
    req.finalData = car;
    return next();
}

export async function getCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info(`getStatistics`)
    let cars: CarEntity[];
    try {
        cars = await getAllCars();
    } catch(error) {
        return next(error);
    }

    if(!cars || !Array.isArray(cars) || cars.length === 0) {
        return next(getExpectedError(404, `There is no any cars.`, {}))
    }

    req.finalMessage = `Get ${cars.length} elements.`;
    req.finalData = cars;
    return next();
}   