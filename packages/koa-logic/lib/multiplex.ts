import { DefaultContext, DefaultState, Middleware } from "koa";
import Expression from "./expression";

function multiplex<ResultT, StateT = DefaultState, ContextT = DefaultContext>(
  expression: Expression<ResultT, StateT, ContextT>,
  middlewares: [
    (result: ResultT) => boolean | Promise<boolean>,
    Middleware<StateT, ContextT>
  ][]
): Middleware<StateT, ContextT> {
  return async (context, next) => {
    const value = await expression(context);
    // eslint-disable-next-line no-restricted-syntax
    for await (const [match, middleware] of middlewares) {
      const result = await match(value);
      if (result) {
        await middleware(context, next);
        return;
      }
    }

    await next();
  };
}

export default multiplex;
