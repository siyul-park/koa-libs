import Application from "koa";
import { Position } from "koa-position";

import toJSON from "./to-json";

export type SerializeOptions = {
  replacer?: (key: string, value: unknown) => unknown;
};

function serialize(
  position: Position,
  options?: SerializeOptions
): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, toJSON(value, options?.replacer));

    await next();
  };
}

export default serialize;
