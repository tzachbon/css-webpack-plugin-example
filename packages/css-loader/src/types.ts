import type { LoaderContext } from "webpack";

export interface PluginContext {
  setOutputCSS?: (css: string) => void
}

export interface ExtendedLoaderContext<T = any> extends LoaderContext<T>, PluginContext { }