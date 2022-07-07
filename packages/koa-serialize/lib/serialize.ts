import Application, {
  DefaultContext,
  DefaultState,
  ParameterizedContext,
} from 'koa';
import { Position } from 'koa-position';

function serialize<
  InT = unknown,
  OutT = unknown,
  StateT = DefaultState,
  ContextT = DefaultContext,
>(
  position: Position<InT, OutT, StateT, ContextT>,
  serializer: (
    value: OutT,
    context: ParameterizedContext<StateT, ContextT>
  ) => InT | Promise<InT>,
): Application.Middleware<StateT, ContextT> {
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, await serializer(value, context));

    await next();
  };
}

export default serialize;
