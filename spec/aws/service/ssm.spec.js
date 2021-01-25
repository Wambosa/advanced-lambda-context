const { AwsContext, AwsService } = require('../../../aws')
const mockEvent = {}

describe('GIVEN a unconfigured ssm service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.ssm(/* no options specified*/))

    if('THEN expect ssm to be registered', () => {
      expect(context._with.ssm).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.ssm.endpoint.host).toEqual('ssm.us-east-1.amazonaws.com')
    })

    it('THEN expect expandParamStoreVariables toBeDefined', () => {
      expect(context.expandParamStoreVariables).toBeDefined()
    })
  })
})

describe('GIVEN a configured ssm service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.ssm({
        as: 'gohan',
        region: 'jp-namek-1',
        endpoint: 'ssm.namek.amazonaws.com'
      }))

    if('THEN expect ssm to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.config.region).toEqual('jp-namek-1')
      expect(context.gohan.endpoint.host).toEqual('ssm.namek.amazonaws.com')
    })
  })
})

describe('GIVEN an environment configured ssm service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.SSM_ENDPOINT = 'ssm.vegeta.amazonaws.com'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.SSM_ENDPOINT
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockEvent)
        .with(AwsService.ssm(/* empty config */))

      expect(context.ssm.config.region).toEqual('jp-vegeta-1')
      expect(context.ssm.endpoint.host).toEqual('ssm.vegeta.amazonaws.com')
    })
  })
})
