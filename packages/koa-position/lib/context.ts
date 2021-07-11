import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function context<CustomT = DefaultContext>(
  key?: keyof ParameterizedContext<DefaultState, CustomT>
): Position<unknown, unknown, DefaultState, CustomT> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx[key] = value as never;
      }
    },
    extract: (ctx): unknown => {
      if (key !== undefined) {
        return ctx[key];
      }
      return ctx;
    },
  });
}

export default context;
