export default {
    port: process.env.port || 1336,
    host: "0.0.0.0",
    api_cars_url: process.env.api_cars_url || "http://localhost:1337/",
    api_statistics_url: process.env.api_statistics_url || "http://localhost:1338/",
}