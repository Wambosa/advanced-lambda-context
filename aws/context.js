const vars = require('../lib/vars')


class AdvancedAwsContext {
  constructor(defaultConfig) {
    this.var = { }
    this._with = { }
    this.cache = { }
    this._packages = null
    this._defaultConfig = defaultConfig || { }
  }

  get event() {
    return this._event
  }

  get packages() {
    if(!this._packages)
      this._packages = vars.packages(this._packageJsonFile)
    return this._packages
  }

  with(extension) {
    return extension(this)
  }

  prepare(runtimeInputs, persistentConfig) {
    const {
      event,
      providerContext,
      cliArgs,
    } = runtimeInputs

    const {
      sharedCache = { },
      providerSdk = require('aws-sdk'),
      logWarning = true,
      loadSerializedVars = false,
      baseConstantsFile = './base.yml',
      funcConstantsFile = './const.yml',
      packageJsonFile = './package.json',
    } = persistentConfig || this._defaultConfig

    this._event = event
    this._packageJsonFile = packageJsonFile
    this.providerContext = providerContext

    this.sdk = providerSdk

    for (let key in sharedCache)
      this.cache[key] = sharedCache[key]

    let base = loadSerializedVars && vars.yml(baseConstantsFile) || {}
    let conf = loadSerializedVars && vars.yml(funcConstantsFile) || {}

    Object.assign(
      this.var,
      base,
      conf,
      vars.env(),
      cliArgs
    )

    // this.log must be called after this.var init
    // so that log level may be honored
    let logger = this.log || console

    if (logWarning && base.ymlLoadError)
      logger.warn({configWarning: base.ymlLoadError})

    if (logWarning && conf.ymlLoadError)
      logger.warn({configWarning: conf.ymlLoadError})

    return this
  }

  async waitFor(ms) {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
  }
}


module.exports = AdvancedAwsContext
