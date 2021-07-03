import Application, {
  DefaultContext,
  DefaultState,
  ParameterizedContext,
} from "koa";
import { Position } from "koa-position";

import { Json } from "@course-design/types";
import toJSON from "./to-json";

export type SerializeOptions<
  StateT = DefaultState,
  ContextT = DefaultContext
> = {
  serialize?: (
    value: unknown,
    context: ParameterizedContext<StateT, ContextT>
  ) => Json | Promise<Json>;
  replacer?: (key: string, value: unknown) => unknown | Promise<Json>;
};

function createDefaultSerialize<
  StateT = DefaultState,
  ContextT = DefaultContext
>(
  options?: SerializeOptions<StateT, ContextT>
): Required<SerializeOptions<StateT, ContextT>>["serialize"] {
  if (options?.replacer != null) {
    return (value: unknown) => toJSON(value, options?.replacer);
  }
  return (value: unknown) => toJSON(value);
}

function serialize<StateT = DefaultState, ContextT = DefaultContext>(
  position: Position,
  options?: SerializeOptions<StateT, ContextT>
): Application.Middleware<StateT, ContextT> {
  const finalSerialize = options?.serialize ?? createDefaultSerialize(options);
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, await finalSerialize(value, context));

    await next();
  };
}

export default serialize;
