import { RpcObject } from "../src/RpcObject";

test("nextId", () => {
  let id = RpcObject.nextId();
  expect(id).toBe(1);
  id = RpcObject.nextId();
  expect(id).toBe(2);
});
