import { assert } from "chai";
import { mapCarsDTOtoCarsEntity, mapDatabaseResultToCarInfos, mapDataToCarsDTO } from "helpers/mapper";
import CarDTO from "schemas/dtos/car.dto";
import CarsDTO from "schemas/dtos/cars.dto";

describe("mapper checks", function () {
    it("mapDataToCarsDTO with one element - success", function () {
      try {
          mapDataToCarsDTO(correctCars)
      } catch(error) {
          assert.fail();
      }
    });

    it("mapDataToCarsDTO with twice elements - success", function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            temp.cars.push({
                made: "testMade",
                model: "testModel",
                year: "testYear",
                vin: "testVin"
            });
            mapDataToCarsDTO(temp)
        } catch(error) {
            assert.fail();
        }
      });

      it("mapDataToCarsDTO without any element - success", function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            temp.cars = new Array<CarDTO>();
            mapDataToCarsDTO(temp);
        } catch(error) {
            assert.fail();
        }
      });

      it("mapDataToCarsDTO with wrong schema - error", function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            delete temp.cars[0].made;
            mapDataToCarsDTO(temp);
            assert.fail();
        } catch(error) {  
        }
      });

      it("mapCarsDTOtoCarsEntity with one element - success", function () {
        try {
            const temp: CarDTO[] = Object.assign([], correctCars.cars);
            mapCarsDTOtoCarsEntity(temp)
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapCarsDTOtoCarsEntity with twice element - success", function () {
        try {
            const temp: CarDTO[] = Object.assign([], correctCars.cars);
            temp.push({
                made: "testMade",
                model: "testModel",
                year: "testYear",
                vin: "testVin"
            });
            mapCarsDTOtoCarsEntity(temp)
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapCarsDTOtoCarsEntity without any element - success", function () {
        try {
            const temp: CarDTO[] = new Array<CarDTO>();
            mapCarsDTOtoCarsEntity(temp)
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapCarsDTOtoCarsEntity with wrong schema - error", function () {
        try {
            const temp: CarDTO[] = Object.assign([], correctCars.cars);
            delete temp[0].made;
            mapCarsDTOtoCarsEntity(temp);
            assert.fail();
        } catch(error) {  
        }
      });

      it("mapDatabaseResultToCarInfos with one element - success", function () {
        try {
            mapDatabaseResultToCarInfos(correctDbResponse);
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapDatabaseResultToCarInfos with twice element - success", function () {
        try {
            const temp = Object.assign([], correctDbResponse);
            temp.push({
                id: 1,
                vin: "test"})
            mapDatabaseResultToCarInfos(temp);
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapDatabaseResultToCarInfos without any element - success", function () {
        try {
            const temp = new Array<any>();
            mapDatabaseResultToCarInfos(temp);
        } catch(error) {
            assert.fail(error);
        }
      });

      it("mapDatabaseResultToCarInfos with wrong schema - error", function () {
        try {
            const temp = Object.assign([], correctDbResponse);
            delete temp[0].id;
            mapDatabaseResultToCarInfos(temp);
            assert.fail();
        } catch(error) {  
        }
      });
})

const correctCars = <CarsDTO> {
    cars: <CarDTO[]>[{
      made: "testMade",
      model: "testModel",
      year: "testYear",
      vin: "testVin"
    }]
}

const correctDbResponse = <{id: number, vin: string}[]> [{
    
}]
