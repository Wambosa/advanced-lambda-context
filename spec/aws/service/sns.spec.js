const { AwsContext, AwsService } = require('../../../aws')
const mockEvent = {}

describe('GIVEN a unconfigured sns service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.sns(/* no options specified*/))

    if('THEN expect sns to be registered', () => {
      expect(context._with.sns).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.sns.endpoint.host).toEqual('sns.us-east-1.amazonaws.com')
    })
  })
})

describe('GIVEN a configured sns service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.sns({
        as: 'gohan',
        region: 'jp-namek-1',
        endpoint: 'sns.namek.amazonaws.com'
      }))

    if('THEN expect sns to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.config.region).toEqual('jp-namek-1')
      expect(context.gohan.endpoint.host).toEqual('sns.namek.amazonaws.com')
    })
  })
})

describe('GIVEN an environment configured sns service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.SNS_ENDPOINT = 'sns.vegeta.amazonaws.com'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.SNS_ENDPOINT
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockEvent)
        .with(AwsService.sns(/* empty config */))

      expect(context.sns.config.region).toEqual('jp-vegeta-1')
      expect(context.sns.endpoint.host).toEqual('sns.vegeta.amazonaws.com')
    })
  })
})
