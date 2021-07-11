import { DefaultState, Request } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function request<
  RequestT = unknown,
  Key extends keyof (Request & RequestT) = keyof (Request & RequestT)
>(
  key: Key
): Position<
  (Request & RequestT)[Key],
  (Request & RequestT)[Key],
  DefaultState,
  { request: RequestT }
>;
function request<RequestT = unknown>(
  key?: undefined
): Position<
  Request & RequestT,
  Request & RequestT,
  DefaultState,
  { request: RequestT }
>;
function request<RequestT = unknown>(
  key?: keyof (Request & RequestT)
): Position<unknown, unknown, DefaultState, { request: RequestT }> {
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
