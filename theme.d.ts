import { ParseColor } from "./parse-color"

export type ParseTheme<T> =
  { colors:
      { [C in keyof T["colors" & keyof T]]:
          T["colors" & keyof T][C] extends infer X
            ? X extends string ? ParseColor<X> : string
            : never
      }
  }