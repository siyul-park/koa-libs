import { Deserializable } from "jsonlike";
import { Json } from "@course-design/types";

function by<T>(deserializable: Deserializable<T>): (value: Json) => T {
  return (value) => deserializable.fromJSON(value);
}

export default by;
