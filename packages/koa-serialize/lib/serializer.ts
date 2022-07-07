import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';

type Serializer<
  InT = unknown,
  OutT = unknown,
  StateT = DefaultState,
  ContextT = DefaultContext,
> = (
  value: OutT,
  context: ParameterizedContext<StateT, ContextT>
) => InT | Promise<InT>;

export default Serializer;
