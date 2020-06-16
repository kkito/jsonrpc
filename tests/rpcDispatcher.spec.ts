import { RpcDispatcher } from "../src/RpcDispatcher";
test("add", () => {
  const disp = new RpcDispatcher();
  disp.add("multi", (a, b) => a * b);
  const result = disp.handle("multi", 3, 4);
  expect(result).toBe(12);
});
