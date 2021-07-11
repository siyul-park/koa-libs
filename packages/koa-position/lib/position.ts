import { DefaultContext, DefaultState } from "koa";
import Injector from "./injector";
import Extractor from "./extractor";

interface Position<
  InT = unknown,
  OutT = unknown,
  StateT = DefaultState,
  CustomT = DefaultContext
> extends Injector<InT, StateT, CustomT>,
    Extractor<OutT, StateT, CustomT> {}

export default Position;
