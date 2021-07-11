import { DefaultState, Request } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function request<T = unknown>(
  key?: keyof (T & Request)
): Position<unknown, unknown, DefaultState, { request: T & Request }> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.request[key] = value as (Request & T)[keyof (T & Request)];
      }
    },
    extract: (ctx): unknown => {
      if (key !== undefined) {
        return ctx.request[key];
      }
      return ctx.request;
    },
  });
}

export default request;
