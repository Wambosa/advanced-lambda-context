
const parse = (event, options = { }) => {
  let {
    logger = console,
    parser = JSON.parse
  } = options

  try {
    return event.Records.map(r => parser(r.Sns.Message))
  } catch(err) {
    logger.error('failed to parse event as SNS.')
    throw err
  }
}

module.exports = {
  isMany: true,
  parse
}
