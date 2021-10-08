import CarDTO from 'schemas/dtos/car.dto';
import { IDbConnection } from "./db/idbconnection";
import getDbConnection from './db/db.connection.provider';
import CarInfo from "schemas/dtos/car.info.dto";
import { mapCarsDTOtoCarsEntity, mapDatabaseResultToCarInfos, mapDatabaseResultToCarsDTO, mapToCar, mapToCars } from "helpers/mapper";

export async function saveCars(cars: CarDTO[]): Promise<CarDTO[]> {
    const connection: IDbConnection = getDbConnection();
    const rows: any[] = await connection.saveCars(mapCarsDTOtoCarsEntity(cars));
    return mapDatabaseResultToCarsDTO(rows);
}

export async function getCarInfos(): Promise<CarInfo[]> {
    const connection: IDbConnection = getDbConnection();
    return connection.getCarInfos()
    .then(data => {
        if(data && Array.isArray(data) && data.length > 0) {
            return mapDatabaseResultToCarInfos(data);
        }

        return null;
    });
}

export async function getCarByVin(vin: string) {
    const connection: IDbConnection = getDbConnection();
    const response: any = await connection.getCarByVin(vin);
    if(response) {
        return mapToCar(response);
    }

    return null;
}

export async function getAllCars() {
    const connection: IDbConnection = getDbConnection();
    const response: any = await connection.getCars();
    if(response && Array.isArray(response) && response.length > 0) {
        return mapToCars(response);
    }   

    return null;
}