import { DefaultContext, DefaultState, Middleware } from 'koa';
import Expression from './expression';

function filter<StateT = DefaultState, ContextT = DefaultContext>(
  expression: Expression<boolean, StateT, ContextT>,
  middleware: Middleware<StateT, ContextT>,
): Middleware<StateT, ContextT> {
  return async (context, next) => {
    const value = await expression(context);
    if (value) {
      await middleware(context, next);
    } else {
      await next();
    }
  };
}

export default filter;
