import { Response } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function response<Key extends keyof Response>(
  key: Key
): Position<Response[Key], Response[Key]>;
function response(key?: undefined): Position<Response, Response>;
function response<Key extends keyof Response>(
  key?: Key
): Position<unknown, unknown> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.response[key] = value as never;
      }
    },
    extract: (ctx): unknown => {
      if (key !== undefined) {
        return ctx.response[key];
      }
      return ctx.response;
    },
  });
}

export default response;
