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

test("buildRequestJson", () => {
  let ret = RequestObject.buildRequestJson("add", 3, 4);
  expect(ret.id).toBe(1);
  expect(ret.method).toEqual("add");
  expect(ret.params).toEqual([3, 4]);
  ret = RequestObject.buildRequestJson("add", 1, 4);
  expect(ret.id).toBe(2);
  expect(ret.params).toEqual([1, 4]);
});
