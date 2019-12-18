const glob = require('glob')

const files = glob.sync('./src/components/**/*.vue')
const componentsInfo = compPath => {
  return files
    .map(componentFileName => {
      const filePath = componentFileName.replace('./src/', compPath)
      const name = componentFileName
        .split('/')
        .reverse()[0]
        .replace(/\.\w+$/, '')
      return {
        filePath,
        name,
      }
    })
    .filter(componentInfo => componentInfo.name !== 'Welcome')
}

module.exports = componentsInfo
