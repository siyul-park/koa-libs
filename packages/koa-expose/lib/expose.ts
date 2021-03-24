import Application from "koa";
import { Extractor } from "koa-position";
import { DeepPartial } from "@course-design/types";

import defaultPick from "./pick";

function expose<T>(
  extractor: Extractor,
  pick: (
    value: T,
    fields: string[]
  ) => DeepPartial<T> | Promise<DeepPartial<T>> = defaultPick
): Application.Middleware {
  return async (context, next) => {
    const field = await extractor.extract(context);
    const fields = Array.isArray(field) ? field : [field];

    const originBody = context.response.body;
    let result: unknown = context.response.body;
    if (originBody != null) {
      if (Array.isArray(originBody)) {
        result = await Promise.all(
          originBody.map((value) => pick(value as T, fields))
        );
      } else {
        result = await pick(originBody as T, fields);
      }
    }
    if (originBody !== result) {
      context.response.body = originBody;
    }

    await next();
  };
}

export default expose;
