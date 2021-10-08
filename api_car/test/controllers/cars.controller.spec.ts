import request from "supertest";
import sinon from 'sinon';
import * as httpService from '../../src/services/http.service';
import * as databaseService from '../../src/services/database.service';
import CarsDTO from 'schemas/dtos/cars.dto';
import CarDTO from 'schemas/dtos/car.dto';
import logger from "logger";
import { error } from "../stubs/logger.stub";
import CarInfoDTO from "schemas/dtos/car.info.dto";

const getStub = sinon.stub(httpService, 'get');
const postStub = sinon.stub(httpService, 'post');
const saveCarsStub = sinon.stub(databaseService, 'saveCars')
const getCarInfosStub = sinon.stub(databaseService, 'getCarInfos')
const errorStub = sinon.stub(logger, 'error').callsFake(error)

import createServer from "../../src/server";
import { assert } from "chai";
import ResponseModel from "schemas/models/response.model";
import ResponseStatus from "schemas/types/response.status";

const app = createServer();

describe("controller check", function () {
    it("getCars with success - check status", async function () {
      getStub.callsFake(successGetCarsFromProxy);
      saveCarsStub.callsFake(successSaveCars);

      await request(app).post("/api/cars").expect(200);
    });

    it("getCars with success - response", async function () {
      getStub.callsFake(successGetCarsFromProxy);
      saveCarsStub.callsFake(successSaveCars);

      const body: ResponseModel = await (await request(app).post("/api/cars")).body as ResponseModel;
      assert(body.responseStatus === ResponseStatus.Success)
    });

    it("getCars wrong response from proxy - check status", async function () {
      getStub.callsFake(wrongGetCarsFromProxy);
      saveCarsStub.callsFake(successSaveCars);

      await request(app).post("/api/cars").expect(502);
    });

    it("getCars wrong response from proxy - response", async function () {
      getStub.callsFake(wrongGetCarsFromProxy);
      saveCarsStub.callsFake(successSaveCars);

      const body: ResponseModel = await (await request(app).post("/api/cars")).body as ResponseModel;
      assert(body.responseStatus === ResponseStatus.Error);
    });

    it("getCars db error - check status", async function () {
      getStub.callsFake(successGetCarsFromProxy);
      saveCarsStub.callsFake(wrongSaveCars);

      await request(app).post("/api/cars").expect(500);
    });

    it("getCars db error - response", async function () {
      getStub.callsFake(successGetCarsFromProxy);
      saveCarsStub.callsFake(wrongSaveCars);

      const body: ResponseModel = await (await request(app).post("/api/cars")).body as ResponseModel;
      assert(body.responseStatus === ResponseStatus.Error);
    });

    it("shareCars with success - check status - success", async function () {
      getCarInfosStub.callsFake(successGetCarInfosStub(testCarInfos));
      postStub.callsFake(successPost);

      await request(app).post("/api/cars/share").expect(200);
    });

    it("shareCars db error - check status - error", async function () {
      getCarInfosStub.callsFake(errorGetCarInfosStub);
      postStub.callsFake(successPost);

      await request(app).post("/api/cars/share").expect(500);
    });

    it("shareCars db empty array - check status - success", async function () {
      getCarInfosStub.callsFake(successGetCarInfosStub([]));
      postStub.callsFake(successPost);

      await request(app).post("/api/cars/share").expect(200);
    });

    it("shareCars db null array - check status - success", async function () {
      getCarInfosStub.callsFake(successGetCarInfosStub(null));
      postStub.callsFake(successPost);

      await request(app).post("/api/cars/share").expect(200);
    });

    it("shareCars post error - check status - error", async function () {
      getCarInfosStub.callsFake(successGetCarInfosStub(testCarInfos));
      postStub.callsFake(errorPost);

      await request(app).post("/api/cars/share").expect(502);
    });
});

const successGetCarsFromProxy = (url: string, expectedStatuses: number[]): Promise<any> => {
  return new Promise<any>((resolve, rejects) => {resolve(testCars)})
};

const wrongGetCarsFromProxy = (url: string, expectedStatuses: number[]): Promise<any> => {
  return new Promise<any>((resolve, rejects) => {resolve({abc: "abc"})})
};

const successSaveCars = (cars: CarDTO[]): Promise<CarDTO[]> => {
  return Promise.resolve([]);
}

const wrongSaveCars = (cars: CarDTO[]): Promise<CarDTO[]> => {
  return Promise.reject(new Error("test"));
}

const successGetCarInfosStub = (temp) => (): Promise<CarInfoDTO[]> => {
  return Promise.resolve(temp);
}

const errorGetCarInfosStub = (): Promise<CarInfoDTO[]> => {
  return Promise.reject(new Error("test"));
}

const successPost = (url: string, data: any, expectedStatuses: number[]): Promise<any> => {
  return Promise.resolve();
}

const errorPost = (url: string, data: any, expectedStatuses: number[]): Promise<any> => {
  const error: Error = new Error('test');
  error.name = 'web';
  return Promise.reject(error);
}

const testCars = <CarsDTO> {
  cars: <CarDTO[]>[{
    made: "testMade",
    model: "testModel",
    year: "testYear",
    vin: "testVin",
  }]
}

const testCarInfos = <CarInfoDTO[]> [{
  id: 1,
  vin: "test"
}];