import { toJSON } from "../lib";

test("toJSON", async () => {
  expect(await toJSON({ x: 5, y: 6 })).toEqual({ x: 5, y: 6 });
  expect(await toJSON([Number(3), String("false"), Boolean(false)])).toEqual([
    3,
    "false",
    false,
  ]);
  expect(await toJSON({ x: [10, undefined, () => {}, Symbol("")] })).toEqual({
    x: [10, null, null, null],
  });
  expect(await toJSON(new Date(2006, 0, 2, 15, 4, 5))).toEqual(
    new Date(2006, 0, 2, 15, 4, 5).toJSON()
  );

  expect(
    await toJSON({ a: new Set([1, 2, 3, 4]) }, (key, value) =>
      value instanceof Set ? [...value] : value
    )
  ).toEqual({ a: [1, 2, 3, 4] });
});
