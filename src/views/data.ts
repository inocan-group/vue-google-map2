const dispensaryCoords: ICoordinates = {
  latitude: 33.451354,
  longitude: -112.084860,
}

export const coordinates: ICoordinates[] = [
  // route 1
  {
    latitude: 33.450423,
    longitude: -112.080272,
  },
  {
    latitude: 33.449349,
    longitude: -112.077699,
  },
  {
    latitude: 33.447111,
    longitude: -112.082587,
  },
  {
    latitude: 33.448221,
    longitude: -112.084839,
  },
  // route 2
  {
    latitude: 33.451443,
    longitude: -112.086511,
  },
  {
    latitude: 33.452589,
    longitude: -112.090285,
  },
  {
    latitude: 33.454469,
    longitude: -112.091293,
  },
  {
    latitude: 33.454791,
    longitude: -112.086575,
  },
]

export interface ICoordinates {
  /**
   * @pattern ^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$
   */
  latitude: number;
  /**
   * @pattern ^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$
   */
  longitude: number;
}

export interface IAddress {
  coordinates?: ICoordinates;
}

export interface Route {
  id: string
  ordersSequence: Order[]
  dispensaryCoordinates: ICoordinates
  dispensary: string
  driver: string
}

export interface Order {
  id: string
  deliveryAddress?: IAddress
  status: 'completed' | 'active-delivery' | 'approaching-delivery-site' | 'arrived' | 'delivered' | 'cancelled'
  driver?: string
}

export interface Driver {
  id: string
}

export function toLatLng (coords: ICoordinates) {
  return {
    lat: coords.latitude,
    lng: coords.longitude,
  }
}

const mockOrders = () => {
  let orders: Order[] = []
  coordinates.forEach((c, i) => {
    orders.push({
      id: `order-${i}`,
      deliveryAddress: {
        coordinates: c,
      },
      status: i < 2 || (i >3 && i < 6 ) ? 'completed' : 'active-delivery',
    })
  })
  return orders
}

const route1:Route = {
  id: 'route-1',
  dispensaryCoordinates: dispensaryCoords,
  ordersSequence: mockOrders().slice(0, 4).map(o => { return { ...o, driver: 'driver-1' }}),
  dispensary: 'mint-mesa',
  driver: 'driver-1'
}

const route2:Route = {
  id: 'route-2',
  dispensaryCoordinates: dispensaryCoords,
  ordersSequence: mockOrders().slice(4, 8).map(o => { return { ...o, driver: 'driver-2' }}),
  dispensary: 'mint-mesa',
  driver: 'driver-2'
}

export const routes = [
  route1, route2
]
