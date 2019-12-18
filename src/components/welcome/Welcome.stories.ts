import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

import Welcome from './Welcome.vue'

storiesOf('Introduction|Welcome', module).add('Welcome', () => ({
  components: { Welcome },
  template: `<Welcome />`,
}))
