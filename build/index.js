const fs = require('fs')
const path = require('path')
const componentsInfo = require('./componentInfo')

// Inspiration from https://github.com/chrisvfritz/hello-vue-components

const indexFileContent = `\
/**
 * Do Not Update this file manually, it was generated using the following command:
 * 
 * yarn build
 * 
 * The code that is used to generate it can be found in:
 * build/index.js
 * 
 * YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY
 **/

/** Components */
${componentsInfo('./')
  .map(component => `export { default as ${component.name} } from '${component.filePath}'`)
  .join('\n')}
`

const indexJSFileContent = `\
"use strict";
exports.__esModule = true;
/**
 * Do Not Update this file manually, it was generated using the following command:
 * 
 * yarn build
 * 
 * The code that is used to generate it can be found in:
 * build/index.js
 * 
 * YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY
 **/
${componentsInfo('@/')
  .map(component => {
    return `var ${component.name}_vue_1 = require("${component.filePath}");
exports.${component.name} = ${component.name}_vue_1["default"];`
  })
  .join('\n')}
`

fs.writeFileSync(path.resolve(__dirname, '../src/index.ts'), indexFileContent)
fs.writeFileSync(path.resolve(__dirname, '../src/index.js'), indexJSFileContent)
