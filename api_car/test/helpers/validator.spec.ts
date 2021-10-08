import { validateCars } from 'helpers/validator'; 
import CarDTO from 'schemas/dtos/car.dto';
import CarsDTO from 'schemas/dtos/cars.dto';
import { assert } from 'sinon';

describe("validator checks", function () {
    it("validate correct object - success", async function () {
      try {
          await validateCars(correctCars)
      } catch(error) {
          assert.fail();
      }
    });

    it("empty array - success", async function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            temp.cars = new Array<CarDTO>();
            await validateCars(temp)
        } catch(error) {
            assert.fail();
        }
    });

    it("empty data - error", async function () {
        try {
            const temp = {};
            await validateCars(temp)
            assert.fail();
        } catch(error) {
        }
    });

    it("without made - error", async function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            delete temp.cars[0].made;
            await validateCars(temp)
            assert.fail();
        } catch(error) {
        }
      });

      it("without model - error", async function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            delete temp.cars[0].model;
            await validateCars(temp)
            assert.fail();
        } catch(error) {
        }
      });

      it("without year - error", async function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            delete temp.cars[0].year;
            await validateCars(temp)
            assert.fail();
        } catch(error) {
        }
      });

      it("without vin - error", async function () {
        try {
            const temp: CarsDTO = Object.assign(correctCars);
            delete temp.cars[0].vin;
            await validateCars(temp)
            assert.fail();
        } catch(error) {
        }
      });
});

const correctCars = <CarsDTO> {
    cars: <CarDTO[]>[{
      made: "testMade",
      model: "testModel",
      year: "testYear",
      vin: "testVin",
    }]
  }