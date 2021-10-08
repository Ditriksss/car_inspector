import CarEntity from "../../schemas/entities/car.entity";

export interface IDbConnection {
    saveCars(cars: CarEntity[]): Promise<any[]>;
    getCarInfos(): Promise<{id: number, vin: string}[]>;
    getCarByVin(vin: string): Promise<any>;
    getCars(): Promise<any[]>;
}