import Application from "koa";
import { Extractor, response } from "koa-position";
import { DeepPartial } from "@course-design/types";

import pick from "./pick";

export type ExposeOptions<T> = {
  pick?: (
    value: T,
    fields: string[]
  ) => DeepPartial<T> | Promise<DeepPartial<T>>;
};

function expose<T>(
  extractor: Extractor<string | string[] | undefined>,
  options?: ExposeOptions<T>
): Application.Middleware {
  const finalPick = options?.pick ?? pick;
  const bodyPosition = response<
    { body: T | T[] | DeepPartial<T> | DeepPartial<T>[] },
    "body"
  >("body");

  return async (context, next) => {
    const field = await extractor.extract(context);
    if (field != null) {
      const fields = Array.isArray(field) ? field : [field];
      const originBody = (await bodyPosition.extract(context)) as T | T[];

      let result = originBody as T | T[] | DeepPartial<T> | DeepPartial<T>[];
      if (originBody != null) {
        if (Array.isArray(originBody)) {
          result = await Promise.all(
            originBody.map((value) => finalPick(value, fields))
          );
        } else {
          result = await finalPick(originBody, fields);
        }
      }

      await bodyPosition.inject(context, result);
    }

    await next();
  };
}

export default expose;
