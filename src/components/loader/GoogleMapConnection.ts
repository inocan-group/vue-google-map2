import { IDictionary } from 'common-types'
export type IGoogleApi = import('google-maps').google
export type IGoogleLibraryChoice = 'places' | 'maps'

export interface IGoogleConnectOptions {
  apiKey?: string
  libraries: IGoogleLibraryChoice[]
}

export default class GoogleMapConnection {
  protected _connectionCache: IDictionary<IGoogleApi> = {}

  /**
   * **useGlobal**
   *
   * Connects to the Google API leveraging a globally setup
   * object on the browser's `window` object. While the "global
   * namespace" gets a bad wrap these days it's sometimes useful
   * for high performance strategies.
   *
   * An example of where you might use this is when you have your
   * SPA _preload_ the google library as soon as there are browser
   * resources to do that. This means that even though a connection
   * is not needed immediately it's immediately available when the
   * connection _is_ needed. But because you are using the _preload_
   * you aren't paying the penalty of unnecessary JS parsing and/or
   * blocking initial page load.
   *
   * If you prefer using a namespaced approach, or possibly have the
   * rare requirement of needing to connect using more than one API
   * KEY, then use the `localConnection()` static initializer instead.
   */
  public static async useGlobal(window: { google?: IGoogleApi }): Promise<GoogleMapConnection> {
    const obj = new GoogleMapConnection()
    if (window.google) {
      obj._api = window.google as IGoogleApi
    }

    return obj
  }

  /**
   * **localConnection**
   *
   * This is a static initializer for when you want to dynamically/asynchronously
   * load the Google API. It will return a Promise which resolves to an instance
   * of `GoogleMapConnection` once the Google API has been imported/connected
   *
   * **Note:** this class has a static caching mechanism that works on a _per api-key_
   * this means that if you instantiate a connection twice with the same API key it will
   * reuse the previously import and return the promise almost immediately (and without
   * need for a network request).
   */
  public static async localConnection(apiKey?: string): Promise<GoogleMapConnection> {
    // if (GoogleMapConnection._connectionCache[apiKey]) {
    //   return GoogleMapConnection._connectionCache[apiKey]
    // }
    const loader = await require('google-maps-api-loader')
    const api = apiKey ? await loader({ apiKey }) : await loader()

    return api
  }

  protected _api!: IGoogleApi

  /** returns the Google API surface */
  public get api() {
    return this._api
  }
}
