import { IDictionary } from 'common-types'
import { select } from '@storybook/addon-knobs'
import { randomPhoenix, redCircleIcon } from './index'
import * as icons from '../svg/index'

export const markerBasicsKnobs = (override: IDictionary = {}) => {
  const markerOptions: IDictionary = {
    None: [],
    Single: [{ position: randomPhoenix(), title: 'Single Marker Title', label: '1' }],
    Dual: [
      { position: randomPhoenix(), title: 'I am a title', label: 'A' },
      { position: randomPhoenix(), title: 'Another title', label: 'B' },
    ],
  }
  const includedSvgSymbolIcons: IDictionary = {
    None: [],
    Star: [
      {
        position: randomPhoenix(),
        title: 'Star',
        label: 'S',
        icon: {
          path: icons.star,
          fillColor: 'yellow',
          fillOpacity: 0.8,
          strokeColor: 'green',
          strokeWidth: '5',
          scale: 0.35,
        },
      },
    ],
    rightArrow: [
      {
        position: randomPhoenix(),
        title: 'right arrow',
        label: 'S',
        icon: {
          path: icons.rightArrow,
          fillColor: 'black',
          fillOpacity: 0.8,
          strokeColor: 'yellow',
          strokeWidth: '5',
          scale: 0.75,
        },
      },
    ],
    leftArrow: [
      {
        position: randomPhoenix(),
        title: 'right arrow',
        label: 'S',
        icon: {
          path: icons.rightArrow,
          rotate: 180,
          fillColor: 'black',
          fillOpacity: 0.8,
          strokeColor: 'yellow',
          strokeWidth: '5',
          scale: 0.75,
        },
      },
    ],
    All: [
      {
        position: randomPhoenix(),
        title: 'Star',
        label: 'S',
        icon: {
          path: icons.star,
          fillColor: 'yellow',
          fillOpacity: 0.8,
          strokeColor: 'green',
          strokeWidth: '5',
          scale: 0.35,
        },
      },
      {
        position: randomPhoenix(),
        title: 'right arrow',
        label: 'S',
        icon: {
          path: icons.rightArrow,
          fillColor: 'black',
          fillOpacity: 0.8,
          strokeColor: 'yellow',
          strokeWidth: '5',
          scale: 0.75,
        },
      },
    ],
  }

  const externalImages: IDictionary = {
    None: [],
    'New Icon': [
      {
        position: randomPhoenix(),
        title: 'New',
        icon: 'https://image.flaticon.com/icons/svg/331/331953.svg',
      },
    ],
    Home: [
      {
        position: randomPhoenix(),
        title: 'home',
        icon: 'https://image.flaticon.com/icons/svg/263/263115.svg',
      },
    ],
    Car: [
      {
        position: randomPhoenix(),
        title: 'car',
        icon: 'https://image.flaticon.com/icons/svg/168/168466.svg',
      },
    ],
    Store: [
      {
        position: randomPhoenix(),
        title: 'store',
        icon: 'https://image.flaticon.com/icons/svg/553/553932.svg',
      },
    ],
    'Shopping Bag': [
      {
        position: randomPhoenix(),
        title: 'store',
        icon: 'https://image.flaticon.com/icons/svg/743/743131.svg',
      },
    ],
    Tag: [
      {
        position: randomPhoenix(),
        title: 'tag',
        icon: 'https://image.flaticon.com/icons/svg/149/149397.svg',
      },
    ],
    Person: [
      {
        position: randomPhoenix(),
        title: 'person',
        icon: {
          url: 'https://image.flaticon.com/icons/svg/149/149449.svg',
          scale: 2,
        },
      },
    ],
  }

  return {
    markers: {
      default: select('Add Dynamic Markers (basic appearance)', markerOptions, []),
    },
    customIcons: {
      default: select('Add Dynamic Markers (with built-in symbols)', includedSvgSymbolIcons, []),
    },
    externalImages: {
      default: select('Add Dynamic Markers (with externally sourced images)', externalImages, []),
    },
  }
}
