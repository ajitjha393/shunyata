export namespace S {
  export type IsString<T> =
    T extends string ? true : false;
  
  export type IsStringLiteral<T> =
    IsString<T> extends true
      ? string extends T ? false : true
      : false

  export type Cast<T> =
    A.Cast<T, string>

  export type At<S, I> =
    Split<S> extends { [_ in A.Cast<I, number>]: infer X }
      ? X
      : ""

  export type Split<T> =
    T extends `${infer H}${infer T}` ? [H, ...Split<T>] :
    T extends "" ? [] : [T]

  export type TrimedL<T> =
    T extends ` ${infer T}` ? TrimedL<T> : T

  export type TrimedR<T> =
    T extends `${infer T} ` ? TrimedL<T> : T

  export type Length<S> =
    Split<S>["length"]

  export type Shifted<S> =
    S extends `${infer _}${infer T}` ? T : never
}

export namespace N {
  export type Cast<T> = A.Cast<T, number>

  export type NaturalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  export type WholeNumbers = [0, ...NaturalNumbers];
  export type WholeNumbersUnshifted = [-1, ...WholeNumbers];

  export type Increment<N> = A.Get<NaturalNumbers, N>
  export type Decrement<N> = A.Get<WholeNumbersUnshifted, N>
}

export namespace L {
  export type SlicedH<A, N> =
    N extends 0 ? [] :
    A extends [infer H, ...infer T] ? [H, ...SlicedH<T, N.Decrement<N>>] : 
    never
}

export namespace Nd {
  export type IsLessThanOrEqual<A, B> =
    A extends 0 ? true :
    B extends A.Get<L.SlicedH<N.WholeNumbers, N.Increment<A>>, number> ? false :
    true

  export type IsLessThan<A, B> = 
    A extends B ? false :
    IsLessThanOrEqual<A, B>
}

export namespace Ns {
  export type ToN<T> =
    { [N in keyof N.WholeNumbers]:
        T extends N ? N.WholeNumbers[N] : never
    }[keyof N.WholeNumbers]

  export type TrimL<T> =
    T extends `0${infer T}` ? TrimL<T> : T

  export type IsLessThanOrEqual<_A, _B, A = TrimL<_A>, B = TrimL<_B>> =
    Nd.IsLessThan<S.Length<A>, S.Length<B>> extends true ? true :
    S.Length<A> extends S.Length<B>
      ? Nd.IsLessThan<ToN<S.At<A, 0>>, ToN<S.At<B, 0>>> extends true ? true :
        S.At<A, 0> extends S.At<B, 0> ? IsLessThanOrEqual<S.Shifted<A>, S.Shifted<B>> :
        false :
    false
}


export namespace A {
  export type Cast<T, U> = T extends U ? T : U;
  export type Get<T, K> = K extends keyof T ? T[K] : never
}