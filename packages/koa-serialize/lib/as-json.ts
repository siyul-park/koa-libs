import { DefaultContext, DefaultState } from "koa";
import { Json } from "@course-design/types";
import Serializer from "./serializer";
import toJSON from "./to-json";

function asJson<StateT = DefaultState, ContextT = DefaultContext>(
  replacer?: (key: string, value: unknown) => unknown | Promise<unknown>
): Serializer<Json, unknown, StateT, ContextT> {
  return (value) => toJSON(value, replacer);
}

export default asJson;
