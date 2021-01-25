const vars = require('../../lib/vars')

describe('GIVEN common environment variables', () => {
  describe('WHEN converting variables into camelCased dictionary', () => {
    let envVars = vars.env()

    it('THEN expect PATH toBe present', () => {
      expect(envVars.path).toBeDefined()
    })

    it('THEN expect NODE_PATH toBe present', () => {
      expect(envVars.nodePath).toBeDefined()
    })
  })
})

describe('GIVEN a valid yml file', () => {
  describe('WHEN converting serialized form into dict', () => {
    it('THEN expect all properties to be represented', () => {
      let conf = vars.yml('./spec/mock/valid.yml')

      expect(conf.loggerLevel).toEqual('trace')
      expect(conf.headers['Content-Type']).toEqual('application/json')
      expect(conf.headers['Access-Control-Allow-Origin']).toEqual('*')
    })
  })
})

describe('GIVEN a missing yml file', () => {
  describe('WHEN attempting to read', () => {

    // this will be logged as a warning, but not throw
    it('THEN expect ymlLoadError flag', () => {
      let conf = vars.yml('./spec/mock/missing.yml')
      expect(conf.ymlLoadError).toEqual('OPTIONAL: ENOENT - unable to read ./spec/mock/missing.yml')
    })
  })
})

describe('GIVEN an invalid yml file', () => {
  describe('WHEN attempting to read', () => {

    // this will be logged as a warning, but not throw
    it('THEN expect ymlLoadError flag', () => {
      let conf = vars.yml('./spec/mock/invalid.yml')
      expect(conf.ymlLoadError).toEqual('YAMLException: end of the stream or a document separator is expected')
    })
  })
})

describe('GIVEN a valid package.json file', () => {
  describe('WHEN converting serialized form into dict', () => {
    it('THEN expect properties to be represented', () => {
      let packageJson = vars.packages('./package.json')

      expect(packageJson.name).toEqual('advanced-lambda-context')
      expect(packageJson.main).toBeDefined()
      expect(packageJson.version).toBeDefined()
      expect(packageJson.engines).toBeDefined()
      expect(packageJson.description).toBeDefined()
    })
  })
})

describe('GIVEN a missing package.json file', () => {
  describe('WHEN attempting to read', () => {

    // this will be logged as a warning, but not throw
    it('THEN expect packageLoadError flag', () => {
      let conf = vars.packages('./package.missing.json')

      expect(conf.packageLoadError).toEqual('OPTIONAL: ENOENT - ./package.missing.json not found')
    })
  })
})
