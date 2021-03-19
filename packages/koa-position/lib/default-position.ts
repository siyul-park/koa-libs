import Application, { DefaultContext, DefaultState } from "koa";
import Position from "./position";

class DefaultPosition<StateT = DefaultState, CustomT = DefaultContext>
  implements Position<StateT, CustomT> {
  constructor(private readonly position: Position<StateT, CustomT>) {}

  extract(
    ctx: Application.ParameterizedContext<StateT, CustomT>
  ): unknown | Promise<unknown> {
    return this.position.extract(ctx);
  }

  inject(
    ctx: Application.ParameterizedContext<StateT, CustomT>,
    value: unknown
  ): void | Promise<void> {
    const existed = this.position.extract(ctx);
    if (existed !== value) {
      this.position.inject(ctx, value);
    }
  }
}

export default DefaultPosition;
