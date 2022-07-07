import Application, {
  DefaultContext,
  DefaultState,
  ParameterizedContext,
} from 'koa';
import { Extractor } from 'koa-position';

function verify<T, StateT = DefaultState, ContextT = DefaultContext>(
  extractor: Extractor<T>,
  validate: (
    value: T,
    context: ParameterizedContext<StateT, ContextT>
  ) => void | Promise<void>,
): Application.Middleware<StateT, ContextT> {
  return async (context, next) => {
    const value = await extractor.extract(context);
    try {
      await validate(value, context);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (typeof e.status === 'number' || typeof e.statusCode === 'number') {
        throw e;
      }
      context.throw(400, e.message);
    }

    await next();
  };
}

export default verify;
