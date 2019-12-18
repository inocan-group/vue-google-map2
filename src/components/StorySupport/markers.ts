function randomPosition(lat: number, lng: number) {
  return () => {
    const lngSeed = Math.random() * 1000
    const latSeed = Math.random() * 1000

    function calc(n: number, s: number) {
      const d = Math.random()
      return d > 0.5 ? n + s / 100000 : n - s / 100000
    }

    return { lng: calc(lng, lngSeed), lat: calc(lat, latSeed) }
  }
}

export const randomPhoenix = randomPosition(33.448376, -112.074036)
enum SymbolPath {
  /**
   * A backward-pointing closed arrow.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath.BACKWARD_CLOSED_ARROW Maps JavaScript API}
   */
  BACKWARD_CLOSED_ARROW = 3,
  /**
   * A backward-pointing open arrow.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath.BACKWARD_OPEN_ARROW Maps JavaScript API}
   */
  BACKWARD_OPEN_ARROW = 4,
  /**
   * A circle.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath.CIRCLE Maps JavaScript API}
   */
  CIRCLE = 0,
  /**
   * A forward-pointing closed arrow.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath.FORWARD_CLOSED_ARROW Maps JavaScript API}
   */
  FORWARD_CLOSED_ARROW = 1,
  /**
   * A forward-pointing open arrow.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath.FORWARD_OPEN_ARROW Maps JavaScript API}
   */
  FORWARD_OPEN_ARROW = 2,
}

export const redCircleIcon: google.maps.Symbol = {
  path: SymbolPath.CIRCLE,
  fillColor: 'red',
}
