import { DefaultState } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function params<CustomT = Record<string, string>>(
  key?: keyof CustomT
): Position<unknown, unknown, DefaultState, { params: CustomT }> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx.params[key] = value as never;
      } else {
        ctx.params = value as CustomT;
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
