import Application, { DefaultContext, DefaultState } from 'koa';

interface Extractor<
  T = unknown,
  StateT = DefaultState,
  CustomT = DefaultContext,
> {
  extract(
    ctx: Application.ParameterizedContext<StateT, CustomT>
  ): T | Promise<T>;
}

export default Extractor;
