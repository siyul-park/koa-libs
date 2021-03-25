import Application from "koa";
import { Position } from "koa-position";

import toJSON from "./to-json";

function serialize(position: Position): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, toJSON(value));

    await next();
  };
}

export default serialize;
