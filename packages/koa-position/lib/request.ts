import { Request } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function request<Key extends keyof Request>(
  key: Key
): Position<Request[Key], Request[Key]>;
function request(key?: undefined): Position<Request, Request>;
function request(key?: keyof Request): Position<unknown, unknown> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.request[key] = value as never;
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
