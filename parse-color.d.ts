import type { S } from "./utils";
import type { NamedColor } from "./named-color";
import type { ParseHexColor } from "./parse-hex";
import type { ParseRgbColor } from "./parse-rgb";

export type ParseColor<T> =
  S.IsString<T> extends false ? (string & {}) | NamedColor :
  S.IsStringLiteral<T> extends false ? "Error: Not a string literal" :
  T extends NamedColor ? T :
  T extends `#${string}` ? ParseHexColor<T> :
  T extends `rgb${string}` ? ParseRgbColor<T> :
  "Error: Should start with # or rgb or should be a named color"