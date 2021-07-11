import Application, { DefaultContext, DefaultState } from "koa";
import Position from "./position";

class DefaultPosition<
  InT = unknown,
  OutT = unknown,
  StateT = DefaultState,
  CustomT = DefaultContext
> implements Position<InT, OutT, StateT, CustomT>
{
  constructor(
    private readonly position: Position<InT, OutT, StateT, CustomT>
  ) {}

  extract(
    ctx: Application.ParameterizedContext<StateT, CustomT>
  ): OutT | Promise<OutT> {
    return this.position.extract(ctx);
  }

  async inject(
    ctx: Application.ParameterizedContext<StateT, CustomT>,
    value: InT
  ): Promise<void> {
    const existed = await this.position.extract(ctx);
    if ((existed as unknown) !== (value as unknown)) {
      await this.position.inject(ctx, value);
    }
  }
}

export default DefaultPosition;
