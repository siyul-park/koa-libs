import { DefaultState, Response } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function response<T = unknown>(
  key?: keyof (T & Response)
): Position<DefaultState, { response: T & Response }> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.response[key] = value as never;
      }
    },
    extract: (ctx) => {
      if (key !== undefined) {
        return ctx.response[key];
      }
      return ctx.response;
    },
  });
}

export default response;
