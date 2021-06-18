import { DefaultContext, DefaultState, Middleware } from "koa";
import Expression from "./expression";

export type Matcher<ResultT> = (result: ResultT) => boolean | Promise<boolean>;
function multiplex<ResultT, StateT = DefaultState, ContextT = DefaultContext>(
  expression: Expression<ResultT, StateT, ContextT>,
  middlewares: [Matcher<ResultT>, Middleware<StateT, ContextT>][]
): Middleware<StateT, ContextT> {
  return async (context, next) => {
    const value = await expression(context);
    // eslint-disable-next-line no-restricted-syntax
    for await (const [matcher, middleware] of middlewares) {
      const result = await matcher(value);
      if (result) {
        await middleware(context, next);
        return;
      }
    }

    await next();
  };
}

export default multiplex;
