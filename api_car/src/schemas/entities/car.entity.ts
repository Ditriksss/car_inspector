interface CarEntity {
    made: string,
    model: string,
    year: string,
    vin: string
};

class CarClass implements CarEntity {
    made = '';
    model = '';
    year = '';
    vin = '';
}

export const formattedFields: string = Object.keys(new CarClass()).join(",");

export default CarEntity;