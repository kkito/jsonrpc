import { JsonRpcUtil } from "../src/index";
import { RpcError } from "../src/RpcError";

test("main pocedure", () => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.add("add", (a, b) => a + b);
  const result = JsonRpcUtil.handle({
    id: 1,
    method: "add",
    version: "2.0",
    params: [3, 4],
  });
  // // tslint:disable-next-line:no-console
  // console.log(result);
  expect(result.id).toBe(1);
  expect(result.result).toBe(7);
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
