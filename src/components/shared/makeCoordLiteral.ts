import { IMapsLatLng } from '../map-types'

export function makeCoordLiteral(gCoord: IMapsLatLng) {
  return {
    lat: gCoord.lat(),
    lng: gCoord.lng(),
  }
}
