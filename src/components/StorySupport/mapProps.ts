import { IDictionary } from 'common-types'
import { select } from '@storybook/addon-knobs'
import { mapDefaults } from './index'
import { WrapperKnobs } from '@/utils/WrapperKnobs'
import { mapControls } from './mapControls'

export const mapProps = (override: IDictionary = {}) => {
  return {
    theme: {
      type: String,
      default: select(
        'Theme',
        {
          Normal: 'normal',
          Dark: 'dark',
          Retro: 'retro',
          Aubergine: 'aubergine',
          Grey: 'grey',
          'Ultra-light': 'ultraLight',
          Roadways: 'roadways',
          'Roadways (minimal)': 'roadwaysMinimal',
          Minimal: 'minimal',
        },
        { ...mapDefaults, ...override }.theme,
      ),
    },
    zoomLevel: {
      type: Number,
      default: select(
        'Zoom Level',
        {
          '2 (World)': 2,
          '5 (Country)': 5,
          '6 ': 6,
          '7 (State)': 7,
          '9 (County)': 9,
          '10 ': 10,
          '11 ': 11,
          '12 (City)': 12,
          '13 ': 13,
          '14 ': 14,
          '15 (City Area)': 15,
          '16 ': 16,
          '17 ': 17,
          '18 ': 18,
          '19 (Street Details)': 19,
          '20 ': 20,
        },
        { ...mapDefaults, ...override }.zoomLevel,
      ),
    },
    center: {
      default: select(
        'Center Point',
        {
          Default: false,
          Boston: { lat: 42.3601, lng: -71.0589 },
          'New York': { lat: 40.73061, lng: -73.935242 },
          'Los Angeles': { lat: 34.0522, lng: -118.2437 },
          Phoenix: { lat: 33.448376, lng: -112.074036 },
        },
        override.center || undefined,
      ),
    },
    panTo: {
      type: Boolean,
      default: select(
        'Pan or Move',
        {
          'Pan to Center Point': true,
          'Move to Center Point': false,
        },
        override.panTo || false,
      ),
    },

    ...mapControls(override),
    ...WrapperKnobs(),
  }
}
