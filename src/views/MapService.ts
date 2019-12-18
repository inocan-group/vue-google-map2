import { Route, Order, Driver, toLatLng, coordinates } from './data'
import { DEFAULT_MAP_CONFIG } from '@/components/map-defaults'
import { MarkerOptionsWithId, PolylineOptionsWithId, IMapsLatLng } from '@/components/map-types'
import { IDictionary, fk } from 'common-types'
import Vue from 'vue'

/**
 * DMI - order marker icon and its properties, icons size is 26x26 
 */
const GREEN_COLOR = '#0BA85E'
const DMI = require('./assets/dispensary.svg')
const DMI_ANCHOR = { x: 26/2, y: 26/2-2 }
/**
 * OMI - order marker icon and its properties, icons size is 36x37 
 */
const OMI = require('./assets/order.svg')
const OMI_SELECTED = require('./assets/order-selected.svg')
const OMI_ANCHOR = { x: 36/2, y: 37/2 }
const OMI_LABEL_COLOR = GREEN_COLOR
const OMI_LABEL_ORIGIN = { x: 36/2, y: 37/2-3 }
/**
 * CMI - driver (car) marker icon and its properties, icons size is 42x28 
 */
const CMI = require('./assets/car.svg')
const CMI_ANCHOR = { x: 42/2, y: 28/2 }
const CMI_LABEL_COLOR = 'white'
const CMI_LABEL_ORIGIN = { x: 42/2-4.5, y: 28/2-1 }
const CMI_LABEL_SIZE = '10px'

/**
 * Points Of Interest (POI) are not needed on the map
 */
const NO_POI = {
  featureType: 'poi',
  stylers: [
    { visibility: 'off' }
  ],
}

/**
 * New map config values for better styling
 */
const MAP_CONFIG = {
  ...DEFAULT_MAP_CONFIG,
  /**
   * Adds fullscreen functionality for the map
   */
  fullscreenControl: true,
  styles: [{ stylers: [{ saturation: -100 }, { lightness: 10 }, { visibility: 'on' }] }, NO_POI],
}

interface IMapComponentState {
  selected?: boolean
  hovered?: boolean
}

/**
 * All elements on the map has additional visual properties **IMapComponentState**
 */
export type IMapRoute = Route & IMapComponentState
export type IMapOrder = Order & IMapComponentState
export type IMapDriver = Driver & IMapComponentState

export class MapService {
  protected _routes: IMapRoute[] = []
  protected _markers: IDictionary<MarkerOptionsWithId> = {}
  protected _polylinesCompleted: Partial<PolylineOptionsWithId> = {}
  protected _polylinesActive: Partial<PolylineOptionsWithId> = {}
  protected _dispensaryMarker: MarkerOptionsWithId
  protected _driverMarkers: IDictionary<MarkerOptionsWithId> = {}

  constructor(selectedRoute: Route) {
    this._dispensaryMarker = {
      id: selectedRoute.dispensary,
      position: toLatLng(selectedRoute.dispensaryCoordinates),
      // @ts-ignore
      icon: {
        url: DMI,
        anchor: DMI_ANCHOR,
      },
    }
    Object.assign(MAP_CONFIG, {
      center: this.dispensaryMarker.position,
      zoom: 15,
    })
  }

  private get dispensaryMarker() {
    return this._dispensaryMarker
  }

  private carLetter (index: number) {
    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
    if (alphabet.length > index % 26) return alphabet[index % 26]
    return ''
  }

  /**
   * this is approx calculation of the latlng midpoint and since the distance in
   * the city are not big, we can do a simple calculation without trigonometry
   */
  private midpoint(a: number, b: number) {
    return a > b ? (a - b) / 2 + b : (b - a) / 2 + a
  }

  private setOrdersPolylines(route: IMapRoute, visible?: boolean) {
    let completedOrders = true
    let completed = [this.dispensaryMarker.position]
    let active = []
    route.ordersSequence.forEach((o, i) => {
      if (completedOrders && o.status === 'completed' && o.deliveryAddress && o.deliveryAddress.coordinates) {
        completed.push(toLatLng(o.deliveryAddress?.coordinates))
      } else if (o.deliveryAddress && o.deliveryAddress.coordinates) {
        const coord = toLatLng(o.deliveryAddress.coordinates)
        if (completedOrders && completed.length > 0) {
          const prevCoord = completed[completed.length - 1]
          if (prevCoord && prevCoord.lat && prevCoord.lng && coord && coord.lat && coord.lng) {
            active.push(prevCoord)
            const lat = this.midpoint(prevCoord.lat as number, coord.lat)
            const lng = this.midpoint(prevCoord.lng as number, coord.lng)
            if (o.driver) {
              this.setDriverMarker(o.driver, {
                lat, lng
              })
            }
          }
        }
        completedOrders = false
        active.push(coord)
      }
    })
    if (completedOrders) {
      completed.push(this.dispensaryMarker.position)
    } else active.push(this.dispensaryMarker.position)
    Vue.set(this._polylinesActive, route.id, {
      strokeColor: GREEN_COLOR,
      strokeWeight: 5,
      strokeOpacity: 0.3,
      path: active,
      visible,
    })
    Vue.set(this._polylinesCompleted, route.id, {
      strokeColor: GREEN_COLOR,
      strokeWeight: 5,
      path: completed,
      visible,
    })
  }

  private setDriverMarker(driverId: fk, position: any) {
    const driverIndex = Object.keys(this.driverMarkers).findIndex(id => id === driverId)
    const letter = this.carLetter(driverIndex)
    Vue.set(this._driverMarkers, driverId, {
      id: driverId,
      label: {
        text: letter,
        color: CMI_LABEL_COLOR,
        fontWeight: '900',
        fontSize: CMI_LABEL_SIZE,
      },
      position: position,
      zIndex: 1000,
      icon: {
        url: CMI,
        anchor: CMI_ANCHOR,
        labelOrigin: CMI_LABEL_ORIGIN,
      }
    })
  }

  public setRoutes(routes: IMapRoute[]) {
    this._routes = routes
    Object.values(this._markers).forEach(m => Vue.set(this._markers, m.id, { ...m, visible: false}))
    Vue.set(this._markers, this.dispensaryMarker.id, this.dispensaryMarker)

    routes.forEach(r => {
      this.setOrdersPolylines(r, r.selected)
      r.ordersSequence.forEach((o, index) => {
        if (o.deliveryAddress && o.deliveryAddress.coordinates) {
          Vue.set(this._markers, o.id, {
            id: o.id,
            label: {
              text: (index + 1) + '',
              color: OMI_LABEL_COLOR,
              fontWeight: '900',
              fontFamily: 'Tahoma'
            },
            position: toLatLng(o.deliveryAddress?.coordinates),
            opacity: r.selected ? 1 : 0,
            icon: {
              url: OMI,
              anchor: OMI_ANCHOR,
              labelOrigin: OMI_LABEL_ORIGIN,
            }
          })
        }
      })
    })
  }
  
  public get markers() {
    return Object.assign({}, { ...this._markers, ...this._driverMarkers})
  }

  private get driverMarkers() {
    return this._driverMarkers
  }

  private get polylineCompleted() {
    return Object.values(this._polylinesCompleted)
  }

  private get polylineActive() {
    return Object.values(this._polylinesActive)
  }

  /**
   * completed (opacity: 1) and active (opacity: 0.3) polylines
   */
  public get polylines() {
    return [...this.polylineActive, ...this.polylineCompleted]
  }

  /**
   * position 7 is the right top corner for fullscreen icon
   */
  public get fullscreen() {
    return 7
  }

  public get mapConfig() {
    return MAP_CONFIG
  }
}