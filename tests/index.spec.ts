import { JsonRpcUtil } from "../src/index";

test("main pocedure", () => {
  const disp = JsonRpcUtil.getDispatcher();
  disp.add("add", (a, b) => a + b);
  const result = JsonRpcUtil.handle({
    id: 1,
    method: "add",
    version: "2.0",
    params: [3, 4],
  });
  expect(result.id).toBe(1);
  expect(result.result).toBe(7);
});

test("getDispatcher", () => {
  const disp = JsonRpcUtil.getDispatcher();
  expect(disp).not.toBeNull();
});
