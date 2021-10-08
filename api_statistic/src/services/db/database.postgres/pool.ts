import logger from 'logger';
import { Pool } from 'pg';
import config from '../../../config';

const createPool = (): Pool => {
  logger.info(`Trying connect to: host ${config.db_host} port ${config.db_port as number} user ${config.db_user}`);
  return new Pool({
    user: config.db_user,
    host: config.db_host,
    database: config.db_name,
    password: config.db_password,
    port: config.db_port as number,
  }); 
}

export default createPool;