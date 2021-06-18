import { Matcher } from "./multiplex";

function equals<ResultT>(expect: ResultT): Matcher<ResultT> {
  return (value) => value === expect;
}

export default equals;
