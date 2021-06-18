import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

type Expression<ResultT, StateT = DefaultState, ContextT = DefaultContext> = (
  context: ParameterizedContext<StateT, ContextT>
) => ResultT | Promise<ResultT>;

export default Expression;
