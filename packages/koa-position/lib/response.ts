import { DefaultState, Response } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function response<ResponseT, Key extends keyof (Response & ResponseT)>(
  key: Key
): Position<
  (Response & ResponseT)[Key],
  (Response & ResponseT)[Key],
  DefaultState,
  { response: ResponseT }
>;
function response<ResponseT>(): Position<
  Response & ResponseT,
  Response & ResponseT,
  DefaultState,
  { response: ResponseT }
>;
function response<ResponseT, Key extends keyof (Response & ResponseT)>(
  key?: Key
): Position<unknown, unknown, DefaultState, { response: ResponseT }> {
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
