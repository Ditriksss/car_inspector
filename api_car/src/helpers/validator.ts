import { carsValidationSchema } from "schemas/dtos/cars.dto";

export async function validateCars(response: any): Promise<void> {
    await carsValidationSchema.validate(response);
}