import { Schema } from "joi";
import { BadRequest } from "http-errors";

function bySchema<P = any>(schema: Schema): (value: P) => Promise<void> {
  return async (value) => {
    try {
      await schema.validateAsync(value);
    } catch (e) {
      throw new BadRequest(e.message);
    }
  };
}

export default bySchema;
