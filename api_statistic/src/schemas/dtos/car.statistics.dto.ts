import Statistic from "schemas/dtos/statistic.dto";

interface CarStatistics {
    vin: string,
    carStatistics: Statistic[]
};

export default CarStatistics;