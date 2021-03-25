import { Json } from "@course-design/types";
import { Serializable } from "jsonlike";

/*
 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify 참고
 */
function toJSON<T>(
  target: T,
  replacer?: (key: string, value: unknown) => unknown,
  isInArray = false
): Json {
  if (typeof (target as Partial<Serializable>)?.toJSON === "function") {
    return ((target as unknown) as Serializable).toJSON();
  }

  switch (typeof target) {
    case "boolean":
    case "number":
    case "string":
      return target;
    case "undefined":
    case "symbol":
    case "function":
      return isInArray ? null : undefined;
    case "bigint":
      throw new TypeError("Do not know how to serialize a BigInt");
    case "object":
      if (target == null) {
        return null;
      }
      if (Array.isArray(target)) {
        return target.map((element) => toJSON(element, replacer, true));
      }

      // eslint-disable-next-line no-case-declarations
      const result: Json = {};
      Object.entries(target).forEach(([key, value]) => {
        if (typeof key === "symbol") return;

        const parsed = toJSON(
          replacer != null ? replacer(key, value) : value,
          replacer
        );
        if (parsed !== undefined) {
          result[key] = parsed;
        }
      });

      return result;
    default:
      return undefined;
  }
}

export default toJSON;
