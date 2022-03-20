const text = require('../../lib/text')

describe('GIVEN snake case variable name', () => {
  describe('WHEN converting into camelCase', () => {
    it('THEN expect screaming snake case to convert successfully', () => {
      let name = text.snakeToCamel('S3_ENDPOINT')
      expect(name).toEqual('s3Endpoint')
    })

    it('THEN expect whispering snake case to convert successfully', () => {
      let name = text.snakeToCamel('dynamo_endpoint')
      expect(name).toEqual('dynamoEndpoint')
    })
  })
})

describe('GIVEN a camelCased variable name with an uppercase first letter', () => {
  describe('WHEN converting first letter to lowercase', () => {
    it('THEN expect remainder of text to be unaltered', () => {
      let name = text.lowerFirstLetter('WsApiID')
      expect(name).toEqual('wsApiID')
    })
  })
})
