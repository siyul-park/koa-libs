import Application from "koa";
import { Position } from "koa-position";
import { Json } from "@course-design/types";
import { BadRequest } from "http-errors";

function deserialize<T>(
  position: Position,
  convert: (value: Json) => T | Promise<T>
): Application.Middleware {
  return async (context, next) => {
    const value = (await position.extract(context)) as Json;

    let parsed: T;
    try {
      parsed = await convert(value);
    } catch (e) {
      if (typeof e.status === "number" || typeof e.statusCode === "number") {
        throw e;
      }
      throw new BadRequest(e.message);
    }

    await position.inject(context, parsed);
    await next();
  };
}

export default deserialize;