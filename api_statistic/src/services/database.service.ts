import { IDbConnection } from "./db/idbconnection";
import getDbConnection from './db/db.connection.provider';
import CarStatistics from "schemas/dtos/car.statistics.dto";
import * as StatisticDTO from 'schemas/dtos/statistic.dto';
import Statistic from 'schemas/entities/statistic.entity';
import * as CarDTO from 'schemas/dtos/car.dto';
import Car from 'schemas/entities/car.entity'
import ChargingTypes from "schemas/types/charging.types";
import CarStatisticDTO from "schemas/dtos/car.statistic.dto";


export async function saveStatistics(car: CarStatistics, carId: number) {
    const connection: IDbConnection = getDbConnection();
    await connection.saveStatistics(convertStatistics(car.carStatistics, carId));
}

export async function getCarIdByVin(vin:string): Promise<number> {
    const connection: IDbConnection = getDbConnection();
    return connection.getCarIdByVin(vin);
}

export async function saveCars(cars: CarDTO.default[]) {
    const connection: IDbConnection = getDbConnection();
    await connection.saveCars(convertCars(cars));
}

export async function getStatisticByVin(vin: string): Promise<Statistic> {
    const connection: IDbConnection = getDbConnection();
    const response: any = await connection.getStatisticByVin(vin);
    if(response) {
        return mapToStatistic(response);
    }

   return null; 
}

export async function getAllStatistics(): Promise<CarStatisticDTO[]> {
    const connection: IDbConnection = getDbConnection();
    const response: any[] = await connection.getStatistics();

    if(Array.isArray(response) && response.length > 0) {
        return mapToStatistcs(response);
    }
    
    return null;
}

function convertStatistics(statisticsDTO: StatisticDTO.default[], carid: number): Statistic[] {
    return statisticsDTO.map(dto => {
        return<Statistic>{
            id_car: carid,
            datetime: dto.datetime,
            soc: dto.soc,
            chargingPower: dto.chargingPower,
            status: dto.status
        }   
    });
}

function convertCars(carsDTO: CarDTO.default[]): Car[] {
    return carsDTO.map(dto => {
        return<Car>{
            id: dto.id,
            vin: dto.vin
        }   
    });
}

function parseDbResponse(response: any): string[] {
    return response.row.replace('(', '').replace(')', '').split(',').map(x => x.trim());;
}

function mapToStatistcs(response: any[], ): CarStatisticDTO[] {
    return response.map((row): CarStatisticDTO => {
        return <CarStatisticDTO> {
            vin: row.vin,
            statistic: mapToStatistic(row)
        }
    });
}

function mapToStatistic(response: any): Statistic {
    const statistic: Statistic = <Statistic> {
        id_car: Number.parseInt(response.id_car),
        datetime: response.datetime as string,
        soc: Number.parseInt(response.soc),
        chargingPower: Number.parseInt(response.chargingpower),
        status: ChargingTypes[response.status as string]
    }
    delete statistic.id_car;
    return statistic;
}
