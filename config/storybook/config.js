import { configure, addParameters } from '@storybook/vue'
import './storybook.css'

function loadStories() {
  require('../../src/components/welcome/Welcome.stories.ts')
  const req = require.context('../../src/components', true, /.stories.(t|j)s$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)