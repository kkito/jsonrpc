import { RpcClient } from "../src/RpcClient";
// import { RpcError } from "../src";
// import { RpcError } from "../src";
const mockHttp = {
  request: async (args: any) => {
    return args;
  },
};
const mockErrorHttp = {
  request: async (_: any) => {
    return {
      jsonrpc: "2.0",
      error: { code: -32601, message: "Method not found" },
      id: "1",
    };
  },
};
test("call remote", async (done) => {
  const proxy = RpcClient.build(mockHttp, {
    responseResult: false,
  });
  const reuslt = await proxy.add(3, 4);
  expect(reuslt.id).toBe(1);
  expect(reuslt.method).toEqual("add");
  expect(reuslt.params).toEqual([3, 4]);

  const reuslt2 = await proxy.multi(5, 4);
  expect(reuslt2.id).toBe(2);
  expect(reuslt2.method).toEqual("multi");
  expect(reuslt2.params).toEqual([5, 4]);
  done();
});

test.only("call remote return result", async (done) => {
  const proxy = RpcClient.build({
    request: async (_: any) => {
      return { result: 100 };
    },
  });
  const reuslt = await proxy.add(3, 4);
  expect(reuslt).toBe(100);
  done();
});

test("exception", async (done) => {
  const proxy = RpcClient.build(mockErrorHttp);

  const errorCall = async () => {
    await proxy.add(3, 4);
  };
  await expect(errorCall()).rejects.toThrow("Method not found");
  done();
});
