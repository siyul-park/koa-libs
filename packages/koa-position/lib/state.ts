import { DefaultState } from "koa";
import Position from "./position";
import DefaultPosition from "./default-position";

function state<StateT = DefaultState>(key: keyof StateT): Position<StateT> {
  return new DefaultPosition({
    inject: (ctx, value: StateT[keyof StateT]): void => {
      ctx.state[key] = value;
    },
    extract: (ctx) => ctx.state[key],
  });
}

export default state;
