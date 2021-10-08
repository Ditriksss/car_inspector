import CarEntity, { formattedFields } from "../../../schemas/entities/car.entity";
import { IDbConnection } from "../idbconnection";
import createPool from './pool';
import format from "pg-format";
import { Pool, QueryResult } from "pg";
import config from '../../../config';
import logger from '../../../logger';

class Postgres implements IDbConnection {
    public async saveCars(cars: CarEntity[]): Promise<any> {
        const pool: Pool = createPool();
        const formattedCarsValues: string[][] = cars.map(x => Object.values(x));

        const query: string = format('INSERT INTO %s (%s) VALUES %L ON CONFLICT (vin) DO NOTHING RETURNING *;', 
        config.db_cars_table_name, formattedFields, formattedCarsValues)

        logger.info(`SQL query to save cars ${query}`);
        const response: QueryResult<any> = await pool.query(query,[]);
        logger.info(`Filled cars response: ${JSON.stringify(response.rows)}`)
        return response.rows;
    }

    public async getCarByVin(vin: string): Promise<any> {
        const pool: Pool = createPool();
        const query: string = format(`SELECT (%s) FROM cars 
        WHERE cars.vin = \'%s\'`, 
        formattedFields, vin);
        logger.info(`db query: ${query}`);
        const response: QueryResult<any> = await pool.query(query);
        
        if(!response || response.rowCount === 0) {
            return null;
        }

        logger.info(`getCarByVin response: ${JSON.stringify(response.rows[0])}`);
        return response.rows[0];
    }

    public async getCars(): Promise<any[]> {
        const pool: Pool = createPool();
        const query: string = format(`SELECT (%s) FROM cars`, formattedFields);
        logger.info(`db query: ${query}`);
        const response: QueryResult<any> = await pool.query(query);
        
        if(!response || response.rowCount === 0) {
            return null;
        }

        logger.info(`getCars response: ${JSON.stringify(response.rows)}`);
        return response.rows;
    }

    public async getCarInfos(): Promise<{id: number, vin: string}[]> {
        const pool: Pool = createPool();
        const query: string = format('SELECT id, vin FROM %s', config.db_cars_table_name);
        const response: QueryResult<any> = await pool.query(query,[]);

        return response.rows;
    }
}

export default Postgres;