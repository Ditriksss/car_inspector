import request from "supertest";
import createServer from "../src/server";
import { assert } from "chai";

const app = createServer();

describe("server checks", function () {
  it("server instantiated", function () {
    assert.isNotNull(app)
  });
});