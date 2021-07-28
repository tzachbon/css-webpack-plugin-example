import { transform } from './transform';
import { appendStyle } from "./append-style";
import type { ExtendedLoaderContext } from './types';

export function cssLoader(this: ExtendedLoaderContext<any>, content: string): string {
  let injectCssInJs = true
  const { classesMap, css } = transform(this.resourcePath, content)

  if (this.setOutputCSS) {
    injectCssInJs = false
    this.setOutputCSS(css)
  }

  return `${injectCssInJs ? `(${appendStyle})(${JSON.stringify(css)})` : ''}

  export default ${JSON.stringify(Object.fromEntries(classesMap.entries()))}`
}