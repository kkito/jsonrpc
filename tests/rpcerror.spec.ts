import { RpcError } from "../src";

test("buildError", () => {
  const error = RpcError.buildError(RpcError.ErrorInternalError);
  const resJson = error.toJson();
  expect(resJson.code).toBe(RpcError.ErrorInternalError[0]);
  expect(resJson.message).toBe(RpcError.ErrorInternalError[1]);
});
