import { Schema } from "joi";
import { BadRequest } from "http-errors";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function bySchema<P = any>(schema: Schema<P>): (value: P) => Promise<void> {
  return async (value) => {
    try {
      await schema.validateAsync(value);
    } catch (e) {
      throw new BadRequest(e.message);
    }
  };
}

export default bySchema;
