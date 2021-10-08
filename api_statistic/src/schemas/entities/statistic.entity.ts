import ChargingTypes from "../types/charging.types";

interface Statistic {
    id_car: number;
    datetime: string,
    soc: number,
    chargingPower: number,
    status: ChargingTypes,
}

class StatisticClass implements Statistic {
    id_car = 0;
    datetime = '';
    soc = 0;
    chargingPower = 0;
    status = 0;
}

export const statisticFormattedFields: string = Object.keys(new StatisticClass()).join(",");

export default Statistic;