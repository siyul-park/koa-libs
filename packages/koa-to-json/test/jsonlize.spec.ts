import jsonlize from "../lib/jsonlize";

test("jsonlize", () => {
  expect(jsonlize({ x: 5, y: 6 })).toEqual({ x: 5, y: 6 });
  expect(jsonlize([Number(3), String("false"), Boolean(false)])).toEqual([
    3,
    "false",
    false,
  ]);
  expect(jsonlize({ x: [10, undefined, function () {}, Symbol("")] })).toEqual({
    x: [10, null, null, null],
  });
  expect(jsonlize(new Date(2006, 0, 2, 15, 4, 5))).toEqual(
    new Date(2006, 0, 2, 15, 4, 5).toJSON()
  );
});
