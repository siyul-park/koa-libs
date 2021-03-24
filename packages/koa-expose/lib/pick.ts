/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

import { DeepPartial } from "@course-design/types";

function pick<T>(value: T, keys: string[]): DeepPartial<T> {
  const result = {};
  keys.forEach((key) => {
    const tokens = key.split(".");

    let currentValue: any = value;
    let currentResult: any = result;
    tokens.forEach((token, index) => {
      if (currentValue == null) return;
      currentValue = currentValue[token];

      if (index === tokens.length - 1) {
        currentResult[token] = currentValue;
      } else if (Array.isArray(currentValue)) {
        currentResult[token] = [];
      } else if (typeof currentValue === "object") {
        currentResult[token] = {};
      }

      currentResult = currentResult[token];
    });
  });

  return result;
}

export default pick;
