import { Schema } from "joi";

function bySchema<P>(schema: Schema<P>): (value: P) => Promise<void> {
  return (value) => schema.validateAsync(value);
}

export default bySchema;
