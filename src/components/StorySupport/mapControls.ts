import { IDictionary } from 'common-types'
import { select } from '@storybook/addon-knobs'
import { mapDefaults, relativePositions } from './index'

export const mapControls = (override: IDictionary) => ({
  fullscreen: {
    type: Number,
    default: select('Full Screen Control', relativePositions, { ...mapDefaults, ...override }.fullscreen),
  },
  streetView: {
    type: Number,
    default: select('Street View', relativePositions, { ...mapDefaults, ...override }.streetView),
  },
  zoomControl: {
    type: Number,
    default: select('Zoom Control', relativePositions, { ...mapDefaults, ...override }.scaleControl),
  },
  mapTypeControl: {
    type: Number,
    default: select('Map Type Control', relativePositions, { ...mapDefaults, ...override }.mapTypeControl),
  },
})
