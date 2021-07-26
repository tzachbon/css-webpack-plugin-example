import type { LoaderContext } from "webpack";
import { transform } from './transform';
import { appendStyle } from "./append-style";

export default function cssLoader(this: LoaderContext<any>, content: string): string {
  const { classesMap, css } = transform(this.resourcePath, content)

  const compliedContent = `
  (${appendStyle})(${JSON.stringify(css)})

  export default ${JSON.stringify(Object.fromEntries(classesMap.entries()), null, 3)}
  `

  return compliedContent
}