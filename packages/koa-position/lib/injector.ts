import Application, { DefaultContext, DefaultState } from 'koa';

interface Injector<
  T = unknown,
  StateT = DefaultState,
  CustomT = DefaultContext,
> {
  inject(
    ctx: Application.ParameterizedContext<StateT, CustomT>,
    value: T
  ): void | Promise<void>;
}

export default Injector;
