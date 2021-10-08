import config from '../../config';
import DB_Types from '../../config/db.types';
import Postgres from './database.postgres/postgres';
import { IDbConnection } from './idbconnection';

const getDbConnection = (): IDbConnection => {
    switch(config.db_type) {
        case DB_Types.Postgres: return new Postgres()
    }
}

export default getDbConnection;