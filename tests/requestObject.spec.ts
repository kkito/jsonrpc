import { RequestObject } from "../src/RequestObject";

test("buildFromJson", () => {
  const req = RequestObject.buildFromJson({
    id: 1,
    method: "add",
    params: [1, 2],
    version: "2.0",
  });
  expect(req.getId()).toBe(1);
  expect(req.getParams()).toEqual([1, 2]);
});
