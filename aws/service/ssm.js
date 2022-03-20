const { lowerFirstLetter } = require('../../lib/text')

const DEFAULT_KEY = 'ssm'

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
            this[trueKey] = new this.sdk.SSM({
              region,
              endpoint: option.endpoint
                || this.var.ssmEndpoint
                || `https://ssm.${region}.amazonaws.com`
            })
          return this[trueKey]
        }
      })

      // todo: support local in memory cache optionally
      context.expandParamStoreVariables = async function (ignorables = ['ssmEndpoint']) {
        let envVarNames = Object.keys(context.var)
        let ssmParams = envVarNames.filter(name => name.substr(0, 3) === 'ssm' && !ignorables.includes(name))

        let res = await context[getterKey].getParameters({
          Names: ssmParams.map(s => context.var[s])
        }).promise()

        // this needs to be a tad bit smarter and deal with invalid params
        // one bad param and the index gets messed up
        ssmParams.forEach((name, i) => {
          let expandedVarName = lowerFirstLetter(name.substr(3))
          context.var[expandedVarName] = res.Parameters[i].Value
        })

        return ssmParams
      }
    }

    return context
  }
}
