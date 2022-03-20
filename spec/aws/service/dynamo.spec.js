const { AwsContext, AwsService } = require('../../../aws')
const mockEvent = {}

describe('GIVEN a unconfigured dynamo service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.dynamo(/* no options specified*/))

    if('THEN expect dynamo to be registered', () => {
      expect(context._with.dynamo).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.dynamo.service.endpoint.host).toEqual('dynamodb.us-east-1.amazonaws.com')
    })
  })
})

describe('GIVEN a configured dynamo service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.dynamo({
        as: 'gohan',
        region: 'jp-namek-1',
        endpoint: 'dynamodb.namek.amazonaws.com'
      }))

    if('THEN expect dynamo to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.service.config.region).toEqual('jp-namek-1')
      expect(context.gohan.service.endpoint.host).toEqual('dynamodb.namek.amazonaws.com')
    })
  })
})

describe('GIVEN an environment configured dynamo service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.DYNAMO_ENDPOINT = 'dynamodb.vegeta.amazonaws.com'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.DYNAMO_ENDPOINT
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockEvent)
        .with(AwsService.dynamo(/* empty config */))

      expect(context.dynamo.service.config.region).toEqual('jp-vegeta-1')
      expect(context.dynamo.service.endpoint.host).toEqual('dynamodb.vegeta.amazonaws.com')
    })
  })
})
