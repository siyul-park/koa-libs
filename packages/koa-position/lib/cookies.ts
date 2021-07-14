import * as Cookies from "cookies";
import Position from "./position";
import DefaultPosition from "./default-position";

function cookies(options?: {
  get?: Cookies.GetOption;
  set?: Cookies.SetOption;
}): Position<never, Cookies>;
function cookies(
  key: string,
  options?: { get?: Cookies.GetOption; set?: Cookies.SetOption }
): Position<string, string>;
function cookies(
  p0?: string | { get?: Cookies.GetOption; set?: Cookies.SetOption },
  p1?: { get?: Cookies.GetOption; set?: Cookies.SetOption }
): Position<unknown, unknown> {
  const key = typeof p0 === "string" ? p0 : undefined;
  const options = typeof p0 === "string" ? undefined : p0 ?? p1;

  return new DefaultPosition({
    inject: (ctx, value?: string | null): void => {
      if (key !== undefined) {
        ctx.cookies.set(key, value, options?.set);
      }
    },
    extract: (ctx) => {
      if (key !== undefined) {
        return ctx.cookies.get(key, options?.get);
      }
      return ctx.cookies;
    },
  });
}

export default cookies;
