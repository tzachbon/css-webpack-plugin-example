import type { Compiler } from 'webpack';

export function injectLoader(compiler: Compiler) {
  if (!compiler.options.module.rules) {
    compiler.options.module.rules = [];
  }
  compiler.options.module.rules.unshift({
    test: /\.css$/,
    loader: require.resolve('@webpack-css/loader'),
    sideEffects: true,
  });
}
