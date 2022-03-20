
module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || 'dataApi'
    const trueKey = `_${getterKey}`

    if (!context._with[getterKey]) {
      context._with[getterKey] = true

      Object.defineProperty(context, getterKey, {
        get: function() {
          if (!this[trueKey]) {
            let library = option.library || require('data-api-client')
            this[trueKey] = library({
              resourceArn: option.dbArn || this.var.dbArn,
              database: option.dbName || this.var.dbName,
              secretArn: option.secretArn || this.var.secretArn
            })
          }
          return this[trueKey]
        }
      })
    }

    return context
  }
}
