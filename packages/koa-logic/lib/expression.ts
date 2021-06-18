import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

type Expression<StateT = DefaultState, ContextT = DefaultContext> = (
  context: ParameterizedContext<StateT, ContextT>
) => boolean | Promise<boolean>;

export default Expression;
