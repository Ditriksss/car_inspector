import DB_Types from "./db.types";

export default {
    port: process.env.port || 1338,
    host: "0.0.0.0",
    statistics_data_url: process.env.proxy_url || "https://www.mockachino.com/63df88f9-7c68-4e/evs/",
    db_user: process.env.db_user || 'postgres',
    db_host: process.env.db_host || 'localhost',
    db_name: process.env.db_name || 'db_cars',
    db_password: process.env.db_password || 'admin',
    db_port: process.env.db_port || 5432,
    db_cars_table_name: 'cars',
    db_statistics_table_name: 'statistics',
    db_type: DB_Types.Postgres
}