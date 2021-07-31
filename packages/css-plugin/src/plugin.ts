import type { WebpackPluginInstance, Compiler, Compilation, NormalModule } from 'webpack'
import type { ExtendedLoaderContext } from '@webpack-css/loader'
import type { ICSSPluginOptions } from './types'
import { injectLoader } from './inject-loader'


export class CSSPlugin implements WebpackPluginInstance {
  private complier!: Compiler
  private cssMap = new Map<string, string>()
  private options?: Required<ICSSPluginOptions>

  constructor(
    private readonly usersOptions: ICSSPluginOptions = {},
    private readonly injectLoader = true
  ) { }

  apply(complier: Compiler) {
    this.complier = complier;

    if (this.injectLoader) {
      injectLoader(this.complier)
    }

    this.complier.hooks.afterPlugins.tap(CSSPlugin.name, this.createOptions.bind(this, this.usersOptions))
    this.complier.hooks.thisCompilation.tap(CSSPlugin.name, this.handleCompilation.bind(this))
  }

  private handleCompilation(compilation: Compilation) {
    this.complier.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(
      CSSPlugin.name,
      this.handleLoader.bind(this)
    )

    compilation.hooks.processAssets.tap(
      {
        name: CSSPlugin.name,
        stage: this.complier.webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED
      },
      this.handleProcessAssets.bind(this, compilation)
    )
  }

  private handleLoader(webpackLoaderContext: object, module: NormalModule) {
    const ctx = webpackLoaderContext as ExtendedLoaderContext<any>;
    if (this.getOptions().inject === 'css') {
      ctx.setOutputCSS = (css: string) => {
        this.cssMap.set(module.resource, css)
      }
    }
  }

  private handleProcessAssets(compilation: Compilation) {
    if (this.getOptions().inject !== 'css') return;

    let assetName: string = this.getOptions().filename!

    for (const [name, entry] of compilation.entrypoints) {
      assetName ||= `${name}.css`
      entry.getEntrypointChunk().files.add(assetName)
    }

    const asset = new this.complier.webpack.sources.RawSource(this.getStaticCSS(), false)
    compilation.emitAsset(assetName, asset)
  }

  private getStaticCSS() {
    let raw = ''
    for (const [path, css] of this.cssMap) {
      raw += `/* ${path} */\n${css}\n`
    }

    return raw
  }

  private createOptions(defaults: ICSSPluginOptions) {
    this.options = {
      inject: defaults.inject ?? this.complier.options.mode === 'production' ? 'css' : 'js',
      filename: defaults.filename || ''
    }
  }

  private getOptions() {
    return this.options || this.usersOptions
  }
}
