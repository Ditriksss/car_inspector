import { IDbConnection } from "../idbconnection";
import createPool from './pool';
import format from "pg-format";
import { Pool, QueryResult } from "pg";
import config from '../../../config';
import logger from '../../../logger';
import Statistic, { statisticFormattedFields } from 'schemas/entities/statistic.entity';
import Car, { carFormattedFields } from 'schemas/entities/car.entity'

class Postgres implements IDbConnection {
    public async saveCars(cars: Car[]): Promise<void> {
        const formattedBulkInsertValues: string[][] = this.convertValuesToBulkInser(cars);
        await this.executeBulkInsert(config.db_cars_table_name, carFormattedFields, formattedBulkInsertValues, 'ON CONFLICT (vin) DO NOTHING');
    }

    public async getCarIdByVin(vin: string): Promise<number> {
        const pool: Pool = createPool();
        const query: string = format('SELECT ID FROM CARS WHERE VIN = \'%s\'', vin);
        logger.info(`db query: ${query}`);
        const response: QueryResult<any> = await pool.query(query);
        
        if(!response || response.rowCount === 0) {
            return 0;
        }

        return response.rows[0].id;
    }

    public async getStatisticByVin(vin: string): Promise<any> {
        const pool: Pool = createPool();
        const query: string = format(`SELECT %s FROM statistics JOIN cars 
        ON (statistics.id_car=cars.id) 
        WHERE cars.vin = \'%s\' 
        ORDER BY DATETIME DESC
        LIMIT 1;`, 
        statisticFormattedFields.split(",").map(field => `statistics.${field}`).join(","), vin);
        logger.info(`db query: ${query}`);
        const response: QueryResult<any> = await pool.query(query);
        
        if(!response || response.rowCount === 0) {
            return null;
        }

        logger.info(`getStatisticByVin response: ${JSON.stringify(response.rows[0])}`);
        return response.rows[0];
    }

    public async getStatistics(): Promise<any[]> {
        const pool: Pool = createPool();
        const query: string = format(`SELECT %s,%s FROM statistics JOIN cars 
        ON (statistics.id_car=cars.id) 
        ORDER BY DATETIME DESC`, 
        statisticFormattedFields.split(",").map(field => `statistics.${field}`).join(","), 
        carFormattedFields.split(",").map(field => `cars.${field}`).join(","));
        logger.info(`db query: ${query}`);
        const response: QueryResult<any> = await pool.query(query);
        
        if(!response || response.rowCount === 0) {
            return null;
        }

        logger.info(`getStatistics response: ${JSON.stringify(response.rows)}`);
        return response.rows;
    }

    public async saveStatistics(statistics: Statistic[]): Promise<void> {
        const formattedBulkInsertValues: string[][] = this.convertValuesToBulkInser(statistics);
        await this.executeBulkInsert(config.db_statistics_table_name, statisticFormattedFields, formattedBulkInsertValues);
    }

    private async executeBulkInsert(tableName: string, fields: string, values: string[][], additional: string = ''): Promise<void> {
        const pool: Pool = createPool();
        const query: string = format('INSERT INTO %s (%s) VALUES %L %s', tableName, fields, values, additional)
        logger.info(`SQL query bulk insert to ${tableName}: ${query}`);
        await pool.query(query,[]);
    }

    private convertValuesToBulkInser<T>(values: T[]): string[][] {
        return values.map(x => Object.values(x));
    }
}

export default Postgres;