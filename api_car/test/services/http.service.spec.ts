import axios, { AxiosResponse } from 'axios';
import { assert } from 'chai';
import { get, post } from 'services/http.service';
import sinon from 'sinon';

const getStub = sinon.stub(axios, 'get');
const postStub = sinon.stub(axios, 'post');

describe("http service checks - get", function () {
    it("get - success", async function () {
      try {
          getStub.callsFake(successGetStub(200));
          await get("", [200]);
      } catch(error) {
          assert.fail();
      }
    });

    it("get - error", async function () {
        try {
            getStub.callsFake(errorGetStub(200));
            await get("", [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });

      it("get - emptyReponse - error", async function () {
        try {
            getStub.callsFake(emptyResponseGetStub(200));
            await get("", [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });

      it("get - wrongStatus - error", async function () {
        try {
            getStub.callsFake(successGetStub(201));
            await get("", [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });
});

describe("http service checks - post", function () {
    it("post - success", async function () {
      try {
        postStub.callsFake(successPostStub(200));
          await post("", {}, [200]);
      } catch(error) {
          assert.fail();
      }
    });

    it("post - error", async function () {
        try {
            postStub.callsFake(errorPostStub(200));
            await post("", {}, [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });

      it("post - emptyReponse - error", async function () {
        try {
            postStub.callsFake(emptyResponsePostStub(200));
            await post("", {}, [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });

      it("post - wrongStatus - error", async function () {
        try {
            postStub.callsFake(successPostStub(201));
            await post("", {}, [200]);
            assert.fail();
        } catch(error) {
            if(!(error instanceof Error) || error.name !== 'web') {
                assert.fail();
            }
        }
      });
});

const successGetStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    const response: AxiosResponse<any> = <AxiosResponse<any>> {
        data: {},
        status: status
    };

    return Promise.resolve(response);
}

const emptyResponseGetStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    return Promise.resolve(null);
}

const errorGetStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    return Promise.reject(new Error());
}

const successPostStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    const response: AxiosResponse<any> = <AxiosResponse<any>> {
        data: {},
        status: status
    };

    return Promise.resolve(response);
}

const emptyResponsePostStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    return Promise.resolve(null);
}

const errorPostStub = (status: number) => (url: string): Promise<AxiosResponse<any>> => {
    return Promise.reject(new Error());
}