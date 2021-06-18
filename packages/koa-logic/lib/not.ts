import {DefaultContext, DefaultState} from "koa";
import Expression from "./expression";

function not<StateT = DefaultState, ContextT = DefaultContext>(expression: Expression<StateT, ContextT>): Expression<StateT, ContextT> {
  return async (context) => {
    const value = await expression(context);
    return !value;
  }
}

export default not;