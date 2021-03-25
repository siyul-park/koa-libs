import { DeepPartial } from "@course-design/types";

function pick<T>(value: T, keys: string[]): DeepPartial<T> {
  const result = {};

  keys.forEach((key) => {
    const paths = key.split(".");

    let currentInput: unknown = value;
    let currentResult: Record<string, unknown> = result;
    // eslint-disable-next-line no-restricted-syntax
    for (const [i, path] of paths.entries()) {
      if (
        typeof currentInput !== "object" ||
        currentInput == null ||
        !(path in currentInput)
      )
        break;
      currentInput = (currentInput as Record<string, unknown>)[path];

      if (i === paths.length - 1) {
        currentResult[path] = currentInput;
      } else if (currentResult[path] == null) {
        currentResult[path] = Array.isArray(currentInput) ? [] : {};
      }

      currentResult = currentResult[path] as Record<string, unknown>;
    }
  });

  return result;
}

export default pick;
