import type { WebpackPluginInstance, Compiler, Compilation, NormalModule } from 'webpack'
import type { ExtendedLoaderContext } from '@webpack-css/loader'
import { injectLoader } from './inject-loader'

interface ICSSPluginOptions {
  inject?: 'css' | 'js'
  injectLoader?: boolean
}

export class CSSPlugin implements WebpackPluginInstance {
  private compiler!: Compiler
  private cssMap = new Map<string, string>()
  private options?: Required<ICSSPluginOptions>

  constructor(
    private readonly usersOptions: ICSSPluginOptions = { injectLoader: true }
  ) { }

  apply(compiler: Compiler) {
    this.compiler = compiler;

    if (this.getOptions().injectLoader) {
      injectLoader(this.compiler)
    }

    this.compiler.hooks.afterPlugins.tap(CSSPlugin.name, this.createOptions.bind(this, this.usersOptions))
    this.compiler.hooks.thisCompilation.tap(CSSPlugin.name, this.handleCompilation.bind(this))
  }

  private handleCompilation(compilation: Compilation) {

    this.compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(
      CSSPlugin.name,
      this.handleLoader.bind(this)
    )

    compilation.hooks.processAssets.tap(
      {
        name: CSSPlugin.name,
        stage: this.compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED
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

    let assetName = '.css'
    for (const [name, entry] of compilation.entrypoints) {
      assetName = name + assetName
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

  private createOptions(defaults: ICSSPluginOptions) {
    this.options = {
      inject: defaults.inject ?? this.compiler.options.mode === 'production' ? 'css' : 'js',
      injectLoader: defaults.injectLoader ?? true
    }
  }

  private getOptions() {
    return this.options || this.usersOptions
  }
}
