const { AwsContext, AwsService } = require('../../../aws')
const mockEvent = {}

describe('GIVEN a unconfigured s3 service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.s3(/* no options specified*/))

    if('THEN expect s3 to be registered', () => {
      expect(context._with.s3).toEqual(true)
    })

    it('THEN expect sane defaults', () => {
      expect(context.s3.endpoint.host).toEqual('s3.us-east-1.amazonaws.com')
    })
  })
})

describe('GIVEN a configured s3 service', () => {
  describe('WHEN extending a context', () => {

    let context = new AwsContext()
      .prepare(mockEvent)
      .with(AwsService.s3({
        as: 'gohan',
        region: 'jp-namek-1',
        endpoint: 's3.namek.amazonaws.com'
      }))

    if('THEN expect s3 to be registered', () => {
      expect(context._with.gohan).toEqual(true)
    })

    it('THEN expect choosen options toBe honored', () => {
      expect(context.gohan.config.region).toEqual('jp-namek-1')
      expect(context.gohan.endpoint.host).toEqual('s3.namek.amazonaws.com')
    })
  })
})

describe('GIVEN an environment configured s3 service', () => {

  beforeAll(() => {
    process.env.REGION = 'jp-vegeta-1'
    process.env.S3_ENDPOINT = 's3.vegeta.amazonaws.com'
  })

  afterAll(() => {
    delete process.env.REGION
    delete process.env.S3_ENDPOINT
  })

  describe('WHEN extending a context', () => {
    it('THEN expect environment variables toBe honored', () => {
      let context = new AwsContext()
        .prepare(mockEvent)
        .with(AwsService.s3(/* empty config */))

      expect(context.s3.config.region).toEqual('jp-vegeta-1')
      expect(context.s3.endpoint.host).toEqual('s3.vegeta.amazonaws.com')
    })
  })
})
