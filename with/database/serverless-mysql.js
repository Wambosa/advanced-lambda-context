
module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || 'mysql'
    const trueKey = `_${getterKey}`

    if (!context._with[getterKey]) {
      context._with[getterKey] = true

      Object.defineProperty(context, getterKey, {
        get: function() {
          if (!this[trueKey]) {
            let library = option.library || require('serverless-mysql')()
            library.config({
              host     : option.host || this.var.rdsHost,
              database : option.database || this.var.database,
              user     : option.user || this.var.rdsUser,
              password : option.pass || this.var.rdsPass
            })
            this[trueKey] = library
          }

          return this[trueKey]
        }
      })
    }

    return context
  }
}
