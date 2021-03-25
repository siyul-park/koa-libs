import Application from "koa";
import { Extractor, response } from "koa-position";
import { DeepPartial } from "@course-design/types";

import pick from "./pick";

const bodyPosition = response("body");

export type ExposeOptions<T> = {
  pick?: (
    value: T,
    fields: string[]
  ) => DeepPartial<T> | Promise<DeepPartial<T>>;
};

function expose<T>(
  extractor: Extractor,
  options?: ExposeOptions<T>
): Application.Middleware {
  const finalPick = options?.pick ?? pick;

  return async (context, next) => {
    const field = await extractor.extract(context);
    if (field != null) {
      const fields = Array.isArray(field) ? field : [field];
      const originBody = await bodyPosition.extract(context);

      let result: unknown = originBody;
      if (originBody != null) {
        if (Array.isArray(originBody)) {
          result = await Promise.all(
            originBody.map((value) => finalPick(value as T, fields))
          );
        } else {
          result = await finalPick(originBody as T, fields);
        }
      }

      await bodyPosition.inject(context, result);
    }

    await next();
  };
}

export default expose;
