import CarDTO from "schemas/dtos/car.dto";
import CarInfoDTO from "schemas/dtos/car.info.dto";
import CarsDTO from "schemas/dtos/cars.dto";
import CarEntity from "schemas/entities/car.entity";

export function mapDataToCarsDTO(data: any): CarsDTO {
        return <CarsDTO> {
            cars: (data.cars as Array<CarDTO>).map(row => {
            return <CarDTO> {
                made: row.made,
                model: row.model,
                year: row.year,
                vin: row.vin
            }
        })
    }
}

export function mapCarsDTOtoCarsEntity(cars: CarDTO[]) {
    return cars.map(dto => {
        return <CarEntity>{
            made: dto.made,
            model: dto.model,
            year: dto.year,
            vin: dto.vin
        }
    })
}

export function mapDatabaseResultToCarsDTO(rows: any[]): CarDTO[] {
    return rows.map(dto => {
        return <CarDTO>{
            made: dto.made,
            model: dto.model,
            year: dto.year,
            vin: dto.vin
        }
    })
}

export function mapDatabaseResultToCarInfos(data: {id: number, vin: string}[]) {
    return data.map(row => {
        return <CarInfoDTO>{
            id: row.id,
            vin: row.vin
        }
    })
}

export function mapToCars(response: any[]): CarEntity[] {
    return response.map(row => mapToCar(row));
}

export function mapToCar(response: any): CarEntity {
    const values: string[] = response.row.replace('(', '').replace(')', '').split(',').map(x => x.trim());
    const car: CarEntity = <CarEntity> {
        made: values[0],
        model: values[1],
        year: values[2],
        vin: values[3]
    }

    return car;
}