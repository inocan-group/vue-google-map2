import { IDictionary } from 'common-types'
import { select } from '@storybook/addon-knobs'

export interface IWithWrapperOptions {
  sideBar?: {
    width: string
    color: string
  }
  display?: 'flex' | 'inline' | 'inline-flex' | 'block'
}

export const withWrapperKnobs = (template: string, options: IDictionary = {}) => {
  template = options.sideBar
    ? `<div class="wrapper" style="display: flex; flex-direction: row" ><div style="display: flex; width:${options.sideBar.width}; height: 100vh; background-color:${options.sideBar.color}">&nbsp;</div><div style="display: flex;">${template}</div></div>`
    : template

  return `
  <story-wrapper 
    :backgroundColor="backgroundColor" 
    :componentWidth="componentWidth"
    :componentBorder="componentBorder"
    :aspectRatio="aspectRatio"
  >
    ${template}
  </story-wrapper>
  `
}

/**
 * Provides a set of _out-of-the-box_ knobs that should
 * fit almost all Storybook stories
 */
export const WrapperKnobs = (options: IDictionary = {}) => ({
  backgroundColor: {
    type: String,
    default: select(
      'Background Color',
      {
        Default: '',
        Black: 'black',
        White: 'white',
        Dark: '#162319',
        Light: '#f9faf7',
      },
      '',
    ),
  },
  /**
   * The component's availability of **width** in the DOM
   */
  componentWidth: {
    type: String,
    default: select(
      'Canvas Width',
      options.width || {
        '100% of available': '100%',
        '90% of available': '90%',
        '50% of available': '50%',
        '25% of available': '25%',
        '1600px': '1600px',
        '1024px': '1024px',
        '640px': '512px',
        '256px': '256px',
      },
      options.width ? Object.keys(options.width)[0] : '100%',
    ),
  },
  componentBorder: {
    type: String,
    default: select(
      'Border',
      {
        'No border': '',
        'Grey dotted (with 0.5rem interior padding)': 'border: 1px dotted darkgrey; padding: 0.5rem',
        'Blue thin border (no interior padding)': 'border: 1px solid blue',
        'Blue thick border (no interior padding)': 'border: 5px solid blue',
        'Black thin border (no interior padding)': 'border: 1px solid black',
        'Black thick border (no interior padding)': 'border: 5px solid black',
      },
      'border: 1px dotted darkgrey; padding: 0.5rem',
    ),
  },
  aspectRatio: {
    type: Number,
    default: select(
      'Canvas Aspect Ratio',
      {
        'Not Fixed Ratio (aka, no constraint on vertical direction)': 0,
        'Square (1:1)': 1,
        'Cinema (16:9)': 1.777777778,
        'Banner (10:1)': 10,
        'Landscape (3:2)': 1.5,
        Portrait: 0.666666667,
      },
      0,
    ),
  },
})
