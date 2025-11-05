import type { S, Ns } from "./utils";

export type ParseRgbColor<T> =
  T extends `rgb${infer S}`
    ? S extends `(${infer S}`
        ? ParseNumberLessThanOrEqual<S.TrimedL<S>, 255> extends infer X
            ? X extends { error: infer E } ? `Error: ${S.Cast<E>} for red` :
              X extends { rest: infer S } ?
                S.TrimedL<S> extends `,${infer S}`
                  ? ParseNumberLessThanOrEqual<S.TrimedL<S>, 255> extends infer X
                      ? X extends { error: infer E } ? `Error: ${S.Cast<E>} for green` :
                        X extends { rest: infer S } ?
                          S.TrimedL<S> extends `,${infer S}`
                            ? ParseNumberLessThanOrEqual<S.TrimedL<S>, 255> extends infer X
                                ? X extends { error: infer E } ? `Error: ${S.Cast<E>} for blue` :
                                  X extends { rest: infer S } ?
                                    S.TrimedR<S> extends `)`
                                      ? T
                                      : "Error: Expected ')' after blue value at the end" :
                                  never
                                : never
                            : "Error: Expected ',' after green value" :
                        never
                      : never
                  : "Error: Expected ',' after red value" :
              never
            : never
        : `Error: Expected '(' got ${S.Cast<S.At<T, 4>>} after rgb`
    : `Error: Expected 'rgb' at the start`

type ParseNumberLessThanOrEqual<T, M extends number, N = ParseNumber<T>, V = N["value" & keyof N]> =
  N extends { error: unknown } ? N :
  Ns.IsLessThanOrEqual<V, `${M}`> extends true ? N :
  { error: `Expected value from 0 to 255 got ${S.Cast<V>}` }
  
type ParseNumber<T, D = ParseDigit<T>> =
   D extends { value: infer Nh, rest: infer Sh }
    ? ParseNumber<Sh> extends infer X
        ? X extends { value: infer Nt, rest: infer S }
            ? { value: `${S.Cast<Nh>}${S.Cast<Nt>}`, rest: S }
            : { value: Nh, rest: Sh }
        : never
    : D

type ParseDigit<T> =
  T extends `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${infer S}`
    ? T extends `${infer V}${S}`
        ? { value: `${V}`, rest: S }
        : never
    : { error: "Expected a number" }
