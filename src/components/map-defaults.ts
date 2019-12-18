export const COLORS = {
  POINT: 'rgb(243,114,114)',
  POINT_FILL: 'rgb(255,255,255)',
  LANDSCAPE: '#DCDCDC',
  BORDERS: 'rgb(195,230,255)',
  SELECTED_POINT: 'rgb(0,184,83)',

  BROWN: 'rgb(139,69,19)',
  BLACK: 'rgb(0,0,0)',
  DARK: 'rgb(20,20,20)',
  BLUE: 'rgb(77,109,155)',
  LIGHT_BLUE: 'rgb(124,156,201)',
  WHITE: 'rgb(255,255,255)',
  WHITEY: 'rgb(240,240,240)',
  GREEN: 'rgb(0,155,77)',
  TOMATO: 'rgb(243,114,114)',
}

export const POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 0.7,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.7,
  scale: 1,
}

/**
 * Controls get placed in a fixed location that is relative to the map's bounding box.
 * This enumeration is based off of `google.maps.ControlPosition`
 * For more info: [docs](https://developers.google.com/maps/documentation/javascript/controls)
 */
export enum IControlPosition {
  /** Elements are positioned in the center of the bottom row. */
  BOTTOM_CENTER,
  /**
   * Elements are positioned in the bottom left and flow towards the middle.
   * Elements are positioned to the right of the Google logo.
   */
  BOTTOM_LEFT,
  /**
   * Elements are positioned in the bottom right and flow towards the middle.
   * Elements are positioned to the left of the copyrights.
   */
  BOTTOM_RIGHT,
  /**
   * Elements are positioned on the left, above bottom-left elements, and flow
   * upwards.
   */
  LEFT_BOTTOM,
  /** Elements are positioned in the center of the left side. */
  LEFT_CENTER,
  /**
   * Elements are positioned on the left, below top-left elements, and flow
   * downwards.
   */
  LEFT_TOP,
  /**
   * Elements are positioned on the right, above bottom-right elements, and
   * flow upwards.
   */
  RIGHT_BOTTOM,
  /** Elements are positioned in the center of the right side. */
  RIGHT_CENTER,
  /** Elements are positioned on the right, below top-right elements, and flow downwards. */
  RIGHT_TOP,
  /**    Elements are positioned in the center of the top row. */
  TOP_CENTER,
  /** Elements are positioned in the top left and flow towards the middle. */
  TOP_LEFT,
  /** Elements are positioned in the top right and flow towards the middle. */
  TOP_RIGHT,
}

export const DEFAULT_MAP_CONFIG = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 10,
  },
  zoom: 4,
  center: { lat: 35, lng: -95 },
}

export const ALT_MAP_CONFIG = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: 'cooperative',
  backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: false,
  zoomControlOptions: {
    style: 'SMALL',
  },

  minZoom: 2,
  maxZoom: 8,
  styles: [
    {
      featureType: 'landscape',
      stylers: [{ hue: COLORS.LANDSCAPE }, { saturation: 50.2 }, { lightness: -34.8 }, { gamma: 1 }],
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      stylers: [{ hue: COLORS.LANDSCAPE }, { saturation: -19.8 }, { lightness: -1.8 }, { gamma: 1 }],
    },
    {
      featureType: 'road.arterial',
      stylers: [{ hue: COLORS.LANDSCAPE }, { saturation: 72.4 }, { lightness: -32.6 }, { gamma: 1 }],
    },
    {
      featureType: 'road.local',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.locality',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'on' }, { color: COLORS.BORDERS }],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      stylers: [{ hue: COLORS.BLUE }, { saturation: -63.2 }, { lightness: 38 }, { gamma: 1 }],
    },
  ],
}
