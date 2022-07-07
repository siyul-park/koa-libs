import pick from '../lib/pick';

test('pick', () => {
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
      {
        f: {
          g: 10,
        },
        e: 10,
      },
    ],
    h: 1,
  };

  expect(pick(obj, ['a.b.c', 'e.0.e'])).toEqual({
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

  expect(pick(obj, ['d', 'e'])).toEqual({
    e: [
      {
        f: {
          g: 10,
        },
        e: 10,
      },
      {
        f: {
          g: 10,
        },
        e: 10,
      },
    ],
  });

  expect(pick(obj, ['a.e'])).toEqual({ a: {} });

  expect(pick(obj, ['a', 'a.b.c'])).toEqual({
    a: {
      b: {
        c: 10,
        d: 5,
      },
    },
  });

  expect(pick(obj, ['a.b.c', 'a'])).toEqual({
    a: {
      b: {
        c: 10,
        d: 5,
      },
    },
  });
});
