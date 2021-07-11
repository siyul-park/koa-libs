import { DefaultContext, DefaultState } from "koa";
import { Json } from "@course-design/types";

import Serializer from "./serializer";
import jsonlize from "./jsonlize";

function asJson<StateT = DefaultState, ContextT = DefaultContext>(
  replacer?: (key: string, value: unknown) => unknown
): Serializer<Json, unknown, StateT, ContextT> {
  return (value) => jsonlize(value, replacer);
}

export default asJson;
