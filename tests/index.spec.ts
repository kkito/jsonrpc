import { JsonRpcUtil } from "../src/index";
import { RpcError } from "../src/RpcError";
import * as util from "util";

const sampleReq = {
  id: 1,
  method: "add",
  version: "2.0",
  params: [3, 4],
};
test("main pocedure", async (done) => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.add("add", (a, b) => a + b);
  const result = JsonRpcUtil.handle(sampleReq);
  expect(result.id).toBe(1);
  expect(result.result).toBe(7);
  // async handle call sync function works
  const result2 = await JsonRpcUtil.asyncHandle(sampleReq);
  expect(result2.result).toBe(7);
  done();
});

test("array request and resp", () => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.add("add", (a, b) => a + b);
  const result = JsonRpcUtil.handle([
    {
      id: 1,
      method: "add",
      version: "2.0",
      params: [3, 4],
    },
    {
      id: 2,
      method: "add",
      version: "2.0",
      params: [13, 4],
    },
    {
      id: 3,
      method: "add",
      version: "2.0",
      params: [23, 4],
    },
  ]);
  expect(result.length).toBe(3);
  expect(result[0].result).toBe(7);
  expect(result[1].result).toBe(17);
  expect(result[2].result).toBe(27);
});

test("method missing error", () => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.clear();
  const result = JsonRpcUtil.handle({
    id: 3,
    method: "add",
    version: "2.0",
    params: [3, 4],
  });
  expect(result.id).toBe(3);
  expect(result.error.code).toBe(RpcError.ErrorMethodNotFound[0]);
});

test("getDispatcher", () => {
  const disp = JsonRpcUtil.getDispatcher();
  expect(disp).not.toBeNull();
});

test("handleFromString", () => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.add("add", (a, b) => a + b);
  let result = JsonRpcUtil.handleFromString(JSON.stringify(sampleReq));
  expect(result.result).toBe(7);
  result = JsonRpcUtil.handleFromString("{indalid json string");
  expect(result.id).toBeNull();
  expect(result.error.code).toBe(RpcError.ErrorParse[0]);
});

test("test async handle", async (done) => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.clear();
  disp.add("asyncAdd", async (a, b) => {
    return new Promise((resolve) => {
      resolve(a + b);
    });
  });
  const result = JsonRpcUtil.handle({
    id: 3,
    method: "asyncAdd",
    version: "2.0",
    params: [3, 4],
  });
  expect(util.types.isPromise(result.result)).toBeTruthy();

  const result2 = await JsonRpcUtil.asyncHandle({
    id: 3,
    method: "asyncAdd",
    version: "2.0",
    params: [3, 4],
  });
  expect(result2.result).toBe(7);
  done();
});

test("test async handle", async (done) => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.clear();
  disp.add("asyncAdd", async (a, b) => {
    return new Promise((resolve) => {
      resolve(a + b);
    });
  });
  disp.add("asyncMulti", async (a, b) => {
    return new Promise((resolve) => {
      resolve(a * b);
    });
  });
  const result = JsonRpcUtil.handle({
    id: 3,
    method: "asyncAdd",
    version: "2.0",
    params: [3, 4],
  });
  expect(util.types.isPromise(result.result)).toBeTruthy();

  const result2 = await JsonRpcUtil.asyncHandle({
    id: 3,
    method: "asyncAdd",
    version: "2.0",
    params: [3, 4],
  });
  expect(result2.result).toBe(7);
  // multi async
  const result3 = await JsonRpcUtil.asyncHandle([
    {
      id: 3,
      method: "asyncAdd",
      version: "2.0",
      params: [3, 4],
    },
    {
      id: 4,
      method: "asyncMulti",
      version: "2.0",
      params: [3, 4],
    },
  ]);
  expect(result3[0].result).toBe(7);
  expect(result3[1].result).toBe(12);
  done();
});
