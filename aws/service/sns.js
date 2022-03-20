const DEFAULT_KEY = 'sns'

module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || DEFAULT_KEY
    const trueKey = `_${getterKey}`

    if (!context._with[getterKey]) {
      context._with[getterKey] = true
      Object.defineProperty(context, getterKey, {
        get: function() {
          const region = option.region || this.var.region || 'us-east-1'
          if (!this[trueKey])
            this[trueKey] = new this.sdk.SNS({
              region,
              endpoint: option.endpoint
                || this.var.snsEndpoint
                || `https://sns.${region}.amazonaws.com`
            })
          return this[trueKey]
        }
      })
    }
    return context
  }
}
