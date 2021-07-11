import { DefaultState } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function params(
  key?: undefined
): Position<
  Record<string, unknown>,
  Record<string, unknown>,
  DefaultState,
  { params: Record<string, unknown> }
>;
function params(
  key: string
): Position<
  unknown,
  unknown,
  DefaultState,
  { params: Record<string, unknown> }
>;
function params(
  key?: string
): Position<
  unknown,
  unknown,
  DefaultState,
  { params: Record<string, unknown> }
> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.params[key] = value as never;
      } else {
        ctx.params = value as never;
      }
    },
    extract: (ctx) => {
      if (key !== undefined) {
        return ctx.params[key];
      }
      return ctx.params;
    },
  });
}

export default params;
