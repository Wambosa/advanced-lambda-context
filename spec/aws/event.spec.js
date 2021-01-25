const { AwsEvent } = require('../../aws')

describe('GIVEN a valid aws SNS event', () => {
  let snsEvent = require('../mock/sns.json')

  describe('WHEN parsing', () => {
    let parsed = AwsEvent.sns.parse(snsEvent)

    it('THEN expect all internal records as parsed json objects', () => {
      expect(parsed[0]).toEqual({name: 'AllMight'})
    })
  })
})
