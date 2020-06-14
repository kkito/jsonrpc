import { JsonRpcUtil } from "../src/index";

test("getDispatcher", () => {
  const disp = JsonRpcUtil.getDispatcher();
  expect(disp).not.toBeNull();
});
