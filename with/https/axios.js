const DEFAULT_KEY = 'https'

module.exports = (option = { }) => {
  return context => {
    const getterKey = option.as || DEFAULT_KEY
    const trueKey = `_${getterKey}`

    if (!context._with[getterKey]) {
      context._with[getterKey] = true
      Object.defineProperty(context, getterKey, {
        get: function() {
          if (!this[trueKey]) {
            let library = option.library
              || require('axios')
            this[trueKey] = library
          }
          return this[trueKey]
        }
      })
    }

    return context
  }
}
