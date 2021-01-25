const API_VERSION = '2018-11-29'
const DEFAULT_KEY = 'wsApiGateway'

//todo: need to catch errors here becuase Promise.all is not tolerant of errors
module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || DEFAULT_KEY
    const trueKey = `_${getterKey}`
    const apiVersion = option.apiVersion || API_VERSION

    if (!context._with[getterKey]) {
      context._with[getterKey] = true

      Object.defineProperty(context, getterKey, {
        get: function() {
          const region = option.region || this.var.region || 'us-east-1'
          if (!this[trueKey]) {
            let apiId = option.apiId || this.var.wsApiId || this._event.requestContext.apiId
            let stage = option.stage || this.var.wsApiStage || this._event.requestContext.stage
            let endpoint = option.endpoint || `${apiId}.execute-api.${region}.amazonaws.com/${stage}`

            this[trueKey] = new this.sdk.ApiGatewayManagementApi({
              apiVersion,
              endpoint,
              region
            })
          }

          return this[trueKey]
        }
      })

      context.transmit = async (parcel, sessionToken) => {
        return context[getterKey].postToConnection({
          ConnectionId: sessionToken,
          Data: typeof parcel === 'string'
            ? parcel
            : JSON.stringify(parcel)
        }).promise()
      }

      context.broadcast = async (message, participants) => {
        let parcel = JSON.stringify(message)
        let serverResponse = participants.map(sessionToken => {
          return context.transmit(parcel, sessionToken) // danger
        })

        return Promise.all(serverResponse)
      }

      context.multicast = async parcels =>  {
        let serverResponse = parcels.map(p => {
          let sessionToken = p.sessionToken
          let parcel = JSON.stringify(p.message)

          return context.transmit(parcel, sessionToken) //danger
        })

        return Promise.all(serverResponse)
      }
    }

    return context
  }
}
