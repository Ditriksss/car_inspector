import { array, object, string } from 'yup';
import CarDTO, { carValidationSchema } from './car.dto';

interface CarsDTO {
    cars: CarDTO[]
}

export const carsValidationSchema = object({
  cars: array(carValidationSchema).required()
});

export default CarsDTO;