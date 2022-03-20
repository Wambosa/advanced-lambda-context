const snakeToCamel = s => s.toLowerCase().replace(/(_\w)/g, m => m[1].toUpperCase())

const lowerFirstLetter = string => `${string.charAt(0).toLowerCase()}${string.slice(1)}`

module.exports = {
  snakeToCamel,
  lowerFirstLetter
}
