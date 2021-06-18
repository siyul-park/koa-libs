import { DefaultContext, DefaultState, Middleware } from "koa";

function finalize<StateT = DefaultState, ContextT = DefaultContext>(
  middleware: Middleware<StateT, ContextT>
): Middleware<StateT, ContextT> {
  return async (context, next) => {
    try {
      await next();
    } finally {
      middleware(context, async () => {});
    }
  };
}

export default finalize;
