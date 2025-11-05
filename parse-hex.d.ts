import type { S, N } from "./utils";

type ParseHexColor<T, I = 0, C = S.At<T, I>> =
  [I, C] extends [4, ""] | [7, ""] ? T :
  I extends 0 | 1 | 2 | 3 | 4 | 5 | 6
    ? C extends (I extends 0 ? "#" : Hexadecimal)
      ? ParseHexColor<T, N.Increment<I>>
      : `Error: Expected ${I extends 0 ? "#": "an hexadecimal character"} got '${S.Cast<C>}' at ${I}` :
  `Error: Unexpected character at ${N.Cast<I>}`


 
type Hexadecimal =
  ( "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  | "a" | "b" | "c" | "d" | "e"| "f"
  ) extends infer X
    ? X | Uppercase<S.Cast<X>>
    : never