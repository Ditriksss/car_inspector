interface Car {
    id: number,
    vin: string
};

class CarClass implements Car {
    id = 0;
    vin = '';
}

export const carFormattedFields: string = Object.keys(new CarClass()).join(",");

export default Car;