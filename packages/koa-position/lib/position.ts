import { DefaultContext, DefaultState } from "koa";
import Injector from "./injector";
import Extractor from "./extractor";

interface Position<StateT = DefaultState, CustomT = DefaultContext>
  extends Injector<StateT, CustomT>,
    Extractor<StateT, CustomT> {}

export default Position;
