import Application from "koa";
import { Position } from "koa-position";
import { Json } from "@course-design/types";

function deserialize<T>(
  position: Position,
  convert: (value: Json) => T | Promise<T>
): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, await convert(value as Json));

    await next();
  };
}

export default deserialize;
