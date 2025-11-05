import type { ParseTheme } from "./theme";

declare const createTheme: <T extends ParseTheme<T>>(theme: T) => T


createTheme({
  colors: {
    test1: "rgb(100, 100, 1000)",
    test2: "rgb(100, 100, 100)",
    test3: "#fffffp",
    test4: "#ffffff",
    test5: "redd",
    test6: "red"
  }
})


export { createTheme };