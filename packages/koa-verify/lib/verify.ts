import Application from "koa";
import { Position } from "koa-position";

function verify<T>(
  position: Position,
  validate: (value: T) => void | Promise<void>
): Application.Middleware {
  return async (context, next) => {
    const value = await position.extract(context);
    await validate(value as T);

    await next();
  };
}

export default verify;
