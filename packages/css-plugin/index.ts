import type { WebpackPluginInstance } from 'webpack'

class HelloWorldPlugin extends WebpackPluginInstance {
  apply(compiler) {
    compiler.hooks.done.tap(
      'Hello World Plugin',
      (
        stats /* stats is passed as an argument when done hook is tapped.  */
      ) => {
        console.log('Hello World!');
      }
    );
  }
}
