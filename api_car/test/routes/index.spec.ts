import { assert, expect } from 'chai';
import request from "supertest";
import router from '../../src/routes';
import createServer from "../../src/server";

const app = createServer();

describe("router checks", function () {
    it("router instantiated", function () {
      assert.isNotNull(router)
    });

    it("router test connection set", function(done) {
        request(app).get("/api/healthcheck").expect(200, done);
    })
});