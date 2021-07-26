import type { WebpackPluginInstance, Compiler, Compilation, NormalModule } from 'webpack'
import type { ExtendedLoaderContext } from '@webpack-css/loader'
import { injectLoader } from './inject-loader'

interface ICSSPluginOptions {
  inject?: 'css' | 'js'
  addLoader?: boolean
}

export class CSSPlugin implements WebpackPluginInstance {
  inject: NonNullable<ICSSPluginOptions['inject']>
  addLoader: NonNullable<ICSSPluginOptions['addLoader']>
  private compiler!: Compiler
  private cssMap = new Map<string, string>()

  constructor(
    {
      inject = 'css',
      addLoader = true
    }: ICSSPluginOptions = {}
  ) {
    this.inject = inject;
    this.addLoader = addLoader;

  }

  apply(compiler: Compiler) {
    this.compiler = compiler;

    if (this.addLoader) {
      injectLoader(this.compiler)
    }

    this.compiler.hooks.compilation.tap(CSSPlugin.name, this.handleCompilation.bind(this))
  }

  private handleCompilation(compilation: Compilation) {
    this.compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(
      CSSPlugin.name,
      this.handleLoader() as any
    )

    compilation.hooks.processAssets.tap(
      {
        name: CSSPlugin.name,
        stage: this.compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED
      },
      this.handleProcessAssets.bind(this, compilation)
    )
  }

  private handleLoader() {
    return (webpackLoaderContext: ExtendedLoaderContext<any>, module: NormalModule) => {

      if (this.isProduction && this.inject === 'css') {
        webpackLoaderContext.setOutputCSS = (css: string) => {
          this.cssMap.set(module.resource, css)
        }
      }
    }
  }

  private handleProcessAssets(compilation: Compilation) {
    if (!(this.isProduction && this.inject === 'css')) return;

    const randomName = Math.random().toString(36).slice(2)
    const assetName = `${randomName}.css`


    for (const [, entry] of compilation.entrypoints) {
      entry.getEntrypointChunk().files.add(assetName)
    }

    const asset = new this.compiler.webpack.sources.RawSource(this.getStaticCSS(), false)
    compilation.emitAsset(assetName, asset)
  }

  private getStaticCSS() {
    let raw = ''
    for (const [path, css] of this.cssMap) {
      raw += `/* ${path} */\n${css}\n`
    }

    return raw
  }

  private get isProduction() {
    return this.compiler.options.mode === 'production'
  }

}