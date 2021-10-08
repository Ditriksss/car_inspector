import Car from 'schemas/entities/car.entity'
import Statistic from "schemas/entities/statistic.entity";

export interface IDbConnection {
    saveCars(cars: Car[]): Promise<void>;
    getCarIdByVin(vin: string): Promise<number>;
    saveStatistics(statistics: Statistic[]): Promise<void>;
    getStatisticByVin(vin: string): Promise<any>;
    getStatistics(): Promise<any[]>;
}