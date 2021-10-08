import { Request, Response, NextFunction } from "express";
import { saveCars } from '../services/database.service';
import Car from "schemas/dtos/car.dto";

export async function postCars(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const cars: Car[] = req.body;
        await saveCars(cars);
        return next();
    } catch(error) {
        next(error);
    }
}