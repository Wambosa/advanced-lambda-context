const { AwsContext, AwsService } = require('../../../aws')
const mockRuntimeInputs = {}

describe('GIVEN a unconfigured stepFunction service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockRuntimeInputs)
      .with(AwsService.stepFunction(/* no options specified*/))

    if('THEN expect stepFunction to be registered', () => {
      expect(context._with.stepFunction).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.stepFunction.endpoint.host).toEqual('states.us-east-1.amazonaws.com')
    })
  })
})

describe('GIVEN a configured stepFunction service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockRuntimeInputs)
      .with(AwsService.stepFunction({
        as: 'gohan',
        region: 'jp-namek-1',
        endpoint: 'states.namek.amazonaws.com'
      }))

    if('THEN expect stepFunction to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.config.region).toEqual('jp-namek-1')
      expect(context.gohan.endpoint.host).toEqual('states.namek.amazonaws.com')
    })
  })
})

describe('GIVEN an environment configured stepFunction service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.STATES_ENDPOINT = 'states.vegeta.amazonaws.com'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.STATES_ENDPOINT
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockRuntimeInputs)
        .with(AwsService.stepFunction(/* empty config */))

      expect(context.stepFunction.config.region).toEqual('jp-vegeta-1')
      expect(context.stepFunction.endpoint.host).toEqual('states.vegeta.amazonaws.com')
    })
  })
})
