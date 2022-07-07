import { DefaultState } from 'koa';
import Position from './position';
import DefaultPosition from './default-position';

function state<
  StateT extends DefaultState,
  Key extends keyof StateT = keyof StateT,
>(key: Key): Position<StateT[Key], StateT[Key], StateT> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      ctx.state[key] = value;
    },
    extract: (ctx) => ctx.state[key],
  });
}

export default state;
