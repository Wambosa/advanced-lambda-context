const { AwsContext } = require('../../aws')
const AwsContextDirect = require('../../aws/context')

describe('GIVEN proper path exports', () => {
  describe('WHEN importing aws context', () => {
    it('THEN expect both techniques to result in the same reference', () => {
      expect(AwsContext).toBe(AwsContextDirect)
    })
  })
})

describe('GIVEN an unconfigured awsContext', () => {
  let unconfigured = new AwsContext(/* no default config provided */)

  describe('WHEN instantiated', () => {
    it('THEN expect sane defaults', () => {
      expect(unconfigured.var).toEqual({})
      expect(unconfigured._with).toEqual({})
      expect(unconfigured.cache).toEqual({})
      expect(unconfigured._packages).toBe(null)
      expect(unconfigured._defaultConfig).toEqual({})
    })
  })

  describe('WHEN async pausing', () => {
    it('THEN expect not to crash', async () => {
      let sleep = await unconfigured.waitFor(1)
      expect(sleep).toEqual(true)
    })
  })
})

describe('GIVEN an preconfigured awsContext', () => {
  describe('WHEN instantiated', () => {
    let preconfig = {
      sharedCache: { powerLevel: 9000 },
      funcConstantsFile: './path/to/namek',
      packageJsonFile: './path/to/earth'
    }

    let preconfigured = new AwsContext(preconfig)

    it('THEN expect config to be stored', () => {

      expect(preconfigured._defaultConfig.sharedCache).toEqual({ powerLevel: 9000 })
      expect(preconfigured._defaultConfig.funcConstantsFile).toEqual('./path/to/namek')
      expect(preconfigured._defaultConfig.packageJsonFile).toEqual('./path/to/earth')
    })
  })

  describe('WHEN preparing', () => {
    
    let preconfig = {
      sharedCache: { powerLevel: 9000 },
      logWarning: false,
      loadSerializedVars: true,
      funcConstantsFile: './spec/mock/constants.yml',
      packageJsonFile: './spec/mock/package.json'
    }

    let context = new AwsContext(preconfig)
    process.env.RACE = 'saiyan'
    context.prepare({
      event: 'an aws event',
      providerContext: 'an aws lambda context',
      cliArgs: {
        name: 'goku'
      }
    })

    it('THEN expect configuration toBe utilized', () => {

      expect(context.event).toEqual('an aws event')
      expect(context.cache.powerLevel).toEqual(9000)
      expect(context.var.technique).toEqual('kamehameha')
      expect(context.packages.main).toEqual('naruto.js')

      expect(context.var.name).not.toEqual('vegeta')
      expect(context.var.name).toEqual('goku')
    })

    it('THEN expect cliArgs to supercede constants file', () => {

      expect(context.var.name).not.toEqual('vegeta')
      expect(context.var.name).toEqual('goku')
    })

    it('THEN expect environment vars to supercede constants file', () => {

      expect(context.var.race).not.toEqual('namekian')
      expect(context.var.race).toEqual('saiyan')
    })
  })


})
