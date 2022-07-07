import { DefaultState, ParameterizedContext } from 'koa';
import Position from './position';
import DefaultPosition from './default-position';

function context<
  CustomT,
  Key extends keyof ParameterizedContext<DefaultState, CustomT>,
>(
  key: Key
): Position<
ParameterizedContext<DefaultState, CustomT>[Key],
ParameterizedContext<DefaultState, CustomT>[Key]
>;
function context<CustomT>(): Position<
ParameterizedContext<DefaultState, CustomT>,
ParameterizedContext<DefaultState, CustomT>
>;
function context<
  CustomT,
  Key extends keyof ParameterizedContext<DefaultState, CustomT>,
>(key?: Key): Position<unknown, unknown, DefaultState, CustomT> {
  return new DefaultPosition({
    inject: (ctx, value): void => {
      if (key !== undefined) {
        ctx[key] = value as never;
      }
    },
    extract: (ctx): unknown => {
      if (key !== undefined) {
        return ctx[key];
      }
      return ctx;
    },
  });
}

export default context;
