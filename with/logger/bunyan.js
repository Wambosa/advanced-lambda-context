module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || 'log'
    const trueKey = `_${getterKey}`

    if (!context._with[getterKey]) {
      context._with[getterKey] = true
      Object.defineProperty(context, getterKey, {
        get: function() {
          if (!this[trueKey]) {

            let config = option.config || {
              src: true,
              name: 'func',
              hostname: ':',
            }

            let level = option.level
              || this.var.logLevel
              || this.var.loggerLevel
              || 'info'
            let library = option.library || require('bunyan')
            let streams = option.streams || [
              {
                level,
                stream: process.stdout
              }
            ]

            this[trueKey] = library.createLogger({
              streams,
              ...config
            })
          }

          return this[trueKey]
        }
      })
    }
    return context
  }
}
