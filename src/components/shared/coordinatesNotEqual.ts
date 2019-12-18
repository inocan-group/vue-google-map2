import { IMapsCoordinate } from '../map-types'

export function coordinatesNotEqual(a: IMapsCoordinate, b: IMapsCoordinate) {
  return !a || !b ? true : a.lat !== b.lat || a.lng !== b.lng
}
