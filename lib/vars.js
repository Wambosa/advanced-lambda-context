const fs = require('fs')
const yaml = require('js-yaml')
const { snakeToCamel } = require('./text')
const ArgumentParser = require('argparse').ArgumentParser


const env = () => {
  let vars = { }
  for (let name in process.env)
    vars[snakeToCamel(name)] = process.env[name]
  return vars
}

const yml = (path='./const.yml') => {
  let raw = null
  let vars = { }

  try {
    raw = fs.readFileSync(path)
  } catch(e) {
    return {
      ymlLoadError: `OPTIONAL: ${e.code} - unable to read ${path}`
    }
  }

  if (raw)
    try {
      vars = yaml.safeLoad(raw)
    } catch(e) {
      return {
        ymlLoadError: `${e.name}: ${e.reason}`
      }
    }

  return vars
}

const packages = (path='./package.json') => {
  try {
    let raw = fs.readFileSync(path)
    return JSON.parse(raw)
  } catch(e) {
    return {
      packageLoadError: `OPTIONAL: ${e.code} - ${path} not found`
    }
  }
}

module.exports = {
  env,
  yml,
  packages,
}
