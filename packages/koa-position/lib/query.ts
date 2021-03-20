import { ParsedUrlQuery } from "querystring";
import Position from "./position";
import DefaultPosition from "./default-position";

function query(key?: keyof ParsedUrlQuery): Position {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.query[key] = value as never;
      } else {
        ctx.query = value as never;
      }
    },
    extract: (ctx) => {
      if (key !== undefined) {
        return ctx.query[key];
      }
      return ctx.query;
    },
  });
}

export default query;
