const { AwsContext, AwsService } = require('../../../aws')
const mockRuntimeInputs = {
  event: {
    requestContext: {
      apiId: '90GKU00'
    }
  }
}

describe('GIVEN a unconfigured wsApiGateway service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockRuntimeInputs)
      .with(AwsService.wsApiGateway(/* no options specified*/))

    if('THEN expect wsApiGateway to be registered', () => {
      expect(context._with.wsApiGateway).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.wsApiGateway.endpoint.host).toEqual('90gku00.execute-api.us-east-1.amazonaws.com')
    })

    it('THEN expect send methods toBeDefined', () => {
      expect(context.transmit).toBeDefined()
      expect(context.broadcast).toBeDefined()
      expect(context.multicast).toBeDefined()
    })
  })
})

describe('GIVEN a configured wsApiGateway service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockRuntimeInputs)
      .with(AwsService.wsApiGateway({
        as: 'gohan',
        region: 'jp-namek-1',
        apiId: 'vegeta',
        stage: 'ss2',
      }))

    if('THEN expect wsApiGateway to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.config.region).toEqual('jp-namek-1')
      expect(context.gohan.endpoint.href).toEqual('https://vegeta.execute-api.jp-namek-1.amazonaws.com/ss2')
    })
  })
})

describe('GIVEN an environment configured wsApiGateway service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.WS_API_ID = '9000'
    process.env.WS_API_STAGE = 'v8'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.WS_API_ID
    delete process.env.WS_API_STAGE
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockRuntimeInputs)
        .with(AwsService.wsApiGateway(/* empty config */))

      expect(context.wsApiGateway.config.region).toEqual('jp-vegeta-1')
      expect(context.wsApiGateway.endpoint.href).toEqual('https://9000.execute-api.jp-vegeta-1.amazonaws.com/v8')
    })
  })
})
