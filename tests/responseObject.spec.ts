import { ResponseObject } from "../src/ResponseObject";

test("toJson", () => {
  const res = new ResponseObject();
  res.setId(2);
  res.setResult(8);
  const resJson = res.toJson();
  expect(resJson.result).toBe(8);
  expect(resJson.id).toBe(2);
});
