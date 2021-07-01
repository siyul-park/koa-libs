import Application from "koa";
import { Position } from "koa-position";

import { Json } from "@course-design/types";
import toJSON from "./to-json";

export type SerializeOptions = {
  serialize?: (value: unknown) => Json | Promise<Json>;
  replacer?: (key: string, value: unknown) => unknown | Promise<Json>;
};

function createDefaultSerialize(
  options?: SerializeOptions
): Required<SerializeOptions>["serialize"] {
  return options?.replacer != null
    ? (value: unknown) => toJSON(value, options?.replacer)
    : toJSON;
}

function serialize(
  position: Position,
  options?: SerializeOptions
): Application.Middleware {
  const finalSerialize = options?.serialize ?? createDefaultSerialize(options);
  return async (context, next) => {
    const value = await position.extract(context);
    await position.inject(context, await finalSerialize(value));

    await next();
  };
}

export default serialize;
