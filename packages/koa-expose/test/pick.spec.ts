import pick from "../lib/pick";

test("pick", () => {
  const obj = {
    a: {
      b: {
        c: 10,
        d: 5,
      },
    },
    e: [
      {
        f: {
          g: 10,
        },
        e: 10,
      },
    ],
    h: 1,
  };

  const result = pick(obj, ["a.b.c", "e.0.e"]);
  expect(result).toEqual({
    a: {
      b: {
        c: 10,
      },
    },
    e: [
      {
        e: 10,
      },
    ],
  });
});
