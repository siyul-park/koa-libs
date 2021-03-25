import Application from "koa";
import { Position } from "koa-position";
import { BadRequest } from "http-errors";

function verify<T>(
  position: Position,
  validate: (value: T) => void | Promise<void>
): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    try {
      await validate(value as T);
    } catch (e) {
      if (typeof e.status === "number" || typeof e.statusCode === "number") {
        throw e;
      }
      throw new BadRequest(e.message);
    }

    await next();
  };
}

export default verify;
