import { Json, Nullish } from "@course-design/types";
import { Serializable } from "jsonlike";

/*
 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify 참고
 */
function jsonlize<T>(
  target: T,
  replacer?: (key: string, value: unknown) => unknown
): Json {
  if (
    typeof (target as Partial<Serializable> | Nullish)?.toJSON === "function"
  ) {
    return (target as unknown as Serializable).toJSON();
  }

  switch (typeof target) {
    case "boolean":
    case "number":
    case "string":
      return target;
    case "undefined":
    case "symbol":
    case "function":
      return undefined;
    case "bigint":
      throw new TypeError("Do not know how to serialize a BigInt");
    case "object":
      if (target == null) {
        return null;
      }
      if (Array.isArray(target)) {
        return target.map((element) => jsonlize(element, replacer) ?? null);
      }

      // eslint-disable-next-line no-case-declarations
      const result: Json = {};
      Object.entries(target).forEach(([key, value]) => {
        if (typeof key === "symbol") return;

        const parsed = jsonlize(
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

export default jsonlize;
