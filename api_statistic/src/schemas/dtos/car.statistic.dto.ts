import Statistic from "schemas/dtos/statistic.dto";

interface CarStatisticDTO {
    vin: string,
    statistic: Statistic
}

export default CarStatisticDTO;