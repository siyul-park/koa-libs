import Application, { DefaultContext, DefaultState } from "koa";

interface Extractor<StateT = DefaultState, CustomT = DefaultContext> {
  extract(
    ctx: Application.ParameterizedContext<StateT, CustomT>
  ): unknown | Promise<unknown>;
}

export default Extractor;
