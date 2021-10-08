import { assert } from 'chai';
import request from "supertest";
import sinon from 'sinon';
import * as controller from "../../src/controllers/cars.controller";
import { Request, Response, NextFunction } from 'express';

const getCarsStub = sinon.stub(controller, 'getCars');

import router from '../../src/routes/cars.routes';
import createServer from "../../src/server";
const app = createServer();

describe("router checks", function () {
    it("router instantiated", function () {
      assert.isNotNull(router)
    });

    it("router test post api/cars endpoint", async function() {
      getCarsStub.callsFake(function(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('confirmed');
        return new Promise<void>(function(resolve, reject) {
          next();
        })
      });

      await request(app).post("/api/cars").expect(200);
    })

    it("router test error behaviour", async function() {
      getCarsStub.callsFake(function(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('confirmed');
        return new Promise<void>(function(resolve, reject) {
          next(new Error("test"));
        })
      });

      await request(app).post("/api/cars").expect(500);
    })
});