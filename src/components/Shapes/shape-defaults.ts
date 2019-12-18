import { COLORS } from '../map-defaults'

export const LINE_SYMBOL_CONFIG = {
  path: 'M 0,-2 0,2',
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 1,
}

export const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: COLORS.WHITE,
  icons: [
    {
      icon: LINE_SYMBOL_CONFIG,
      repeat: '10px',
    },
  ],
}

export const POLYGON_PATH_CONFIG = {
  fillOpacity: 0,
  dragable: false,
  clickable: true,
  editable: false,
  geodesic: false,
  strokeColor: COLORS.BLACK,
  strokeOpacity: 0.9,
  strokeWeight: 2,
}
