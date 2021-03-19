import Application, { DefaultContext, DefaultState } from "koa";

interface Injector<StateT = DefaultState, CustomT = DefaultContext> {
  inject(
    ctx: Application.ParameterizedContext<StateT, CustomT>,
    value: unknown
  ): void | Promise<void>;
}

export default Injector;
