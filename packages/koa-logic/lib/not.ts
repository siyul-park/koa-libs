import { DefaultContext, DefaultState } from 'koa';
import Expression from './expression';

function not<StateT = DefaultState, ContextT = DefaultContext>(
  expression: Expression<boolean, StateT, ContextT>,
): Expression<boolean, StateT, ContextT> {
  return async (context) => {
    const value = await expression(context);
    return !value;
  };
}

export default not;
