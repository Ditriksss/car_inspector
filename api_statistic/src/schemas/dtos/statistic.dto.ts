import ChargingTypes from "../types/charging.types";

interface Statistic {
    datetime: string,
    soc: number,
    chargingPower: number,
    status: ChargingTypes
}

export default Statistic;