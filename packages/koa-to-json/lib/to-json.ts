import Application from "koa";
import { Position } from "koa-position";

import jsonlize from "./jsonlize";

function toJSON(position: Position): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, jsonlize(value));

    await next();
  };
}

export default toJSON;
