import { object, string } from "yup";

interface CarDTO {
    made: string,
    model: string,
    year: string,
    vin: string
}

export const carValidationSchema = object({
    made: string()
    .required("made not provided."),
    model: string()
    .required("model not provided."),
    year: string()
    .required("year not provided."),
    vin: string()
    .required("vin not provided."),
  });

export default CarDTO;