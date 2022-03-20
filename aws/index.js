const AwsContext = require('./context')

/*
  write docs about shared cache version and nonShared versions
  nonShared: AwsContext
*/
module.exports = {
  AwsContext,
  SharedAwsContext: new AwsContext(),
  AwsService: {
    s3: require('./service/s3'),
    sns: require('./service/sns'),
    sqs: require('./service/sqs'),
    ssm: require('./service/ssm'),
    dynamo: require('./service/dynamo'),
    wsApiGateway: require('./service/wsApiGateway'),
    stepFunction: require('./service/stepFunction')
  },
  AwsEvent: {
    sns: require('./event/sns'),
    sqs: require('./event/sqs'),
  }
}
