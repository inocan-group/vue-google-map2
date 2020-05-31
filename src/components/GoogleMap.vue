<template>
  <div ref="googleMap" :class="_classes" :style="style">
    <div v-if="ready">
      <slot name="default"></slot>
    </div>
    <div v-else>
      <p>API not ready yet</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import GoogleMapConnection, { IGoogleApi } from './loader/GoogleMapConnection'
import GoogleMapPolygon from './Shapes/GoogleMapPolygon.vue'
import GoogleMapRectangle from './Shapes/GoogleMapRectangle.vue'
import { loadNow } from './loader/googleMapsLoader'
import { DEFAULT_MAP_CONFIG } from './map-defaults'
import {
  IMapRectangle,
  IMapTypeStyle,
  IMap,
  IMapsEventListener,
  IMapsCoordinate,
  Marker,
  MarkerOptionsWithId,
  IMarkerOptions,
  IMapApi,
} from './map-types'
import { wait, IDictionary } from 'common-types'
import { coordinatesNotEqual, makeCoordLiteral } from './shared/index'
import * as theme from './theme'

export * from './map-types'

export interface IGoogleMapConfig {
  apiKey?: string
}

@Component({
  components: {
    GoogleMapPolygon,
    GoogleMapRectangle,
  },
})
export default class GoogleMap extends Vue {
  @Prop() apiKey!: string
  @Prop() loadingStrategy?: 'now' | 'wait'
  @Prop() mapConfig!: any
  @Prop() connection?: GoogleMapConnection
  /**
   * optionally state the width as "250px", "85%", etc.; if not stated it will
   * by default assume 100%.
   */
  @Prop() width?: string
  /**
   * Optionally state a default `aspectRatio` so height can be determined by
   * the _width_. If not stated it will use a 1:1 aspect ratio. Note the ratio
   * is calculated as `width/height`.
   */
  @Prop() aspectRatio?: number

  /**
   * allows additional classes to be passed in to further
   * annotate the google map DIV
   */
  @Prop() classes?: string
  @Prop() lines?: Array<{
    id: string
    path: Array<{ lat: number; lng: number }>
  }>
  @Prop() polygons?: { id: string; paths: any }
  @Prop() rectangles?: IMapRectangle[]
  /** the user specified set of markers */
  @Prop() markers?: MarkerOptionsWithId[]
  /** a dictionary of markers registed to the map any given time */
  protected _markers: IDictionary<Marker> = {}

  @Prop() theme?: keyof typeof theme
  @Prop() center?: { lat: number; lng: number }

  //#region CONTROLS
  @Prop() fullscreen?: number
  @Prop() streetView?: number
  @Prop() zoomLevel?: number
  @Prop() zoomControl?: number
  @Prop() mapTypeControl?: number
  @Prop() rotateControl?: number
  //#endregion

  /**
   * Allows the user to state that changes to the center
   * point brought on by the `center` property should be
   * _panned_ to instead of _moved_ to.
   */
  @Prop() panTo?: boolean

  public _api!: IGoogleApi
  public _map?: IMap
  protected ready: boolean = false

  protected _zoomListener!: IMapsEventListener
  protected _centerListener!: IMapsEventListener

  /** the last _user specified_ zoom level */
  protected _zoomLevel!: number
  /** the last _user specified_ center point */
  protected _center!: IMapsCoordinate

  public get api() {
    return this._api
  }
  @Watch('zoomLevel')
  @Watch('theme')
  @Watch('center')
  onSettingChange() {
    this.reconfigure()
  }

  @Watch('fullscreen')
  @Watch('streetView')
  @Watch('zoomControl')
  @Watch('rotateControl')
  @Watch('mapTypeControl')
  @Watch('rotateControl')
  onConfigChanged() {
    this.redraw()
  }

  public get style() {
    const height = this.aspectRatio ? `calc(100vw / ${this.aspectRatio})` : '100%'
    const width = this.width || '100%'
    return `width: ${width}; height: ${height}`
  }

  /**
   * Provides the map instance to children components
   */
  public async getMap(): Promise<IMap> {
    if (this._map) {
      return this._map
    } else {
      while (!this._map) {
        await wait(10)
      }
      return this._map
    }
  }

  /**
   * Provides the Google Maps API to children components
   */
  public async getApi(): Promise<IMapApi> {
    if (this._map) {
      return google.maps
    } else {
      while (!this._map) {
        await wait(10)
      }
      return google.maps
    }
  }

  protected get _classes() {
    const classes = this.classes
      ? Array.isArray(this.classes)
        ? this.classes.join(' ')
        : this.classes.replace(/,/g, ' ')
      : ''
    return `google-map ${classes}`
  }

  /**
   * Sets the configuration for the map whenever it is full redrawn (including
   * initial draw)
   */
  protected _mapConfig() {
    return {
      ...DEFAULT_MAP_CONFIG,
      ...this.mapConfig,
      ...(this.zoomLevel && this.zoomLevel > 0 ? { zoom: this.zoomLevel } : {}),
      ...this.control('mapTypeControl', 'mapType'),
      ...(this.zoomControl !== 0 ? { scaleControl: false, zoomeControl: false } : {}),
      ...this.control('rotateControl', 'rotate'),
      ...this.control('fullscreen'),
      ...(this.center ? { center: this.center } : {}),
      ...this.control('streetView'),
      ...(this.theme ? { styles: theme[this.theme] } : {}),
    }
  }

  initializeMap() {
    this._map = new this._api.maps.Map(this.$el, this._mapConfig())
    return this._map
  }

  /**
   * In cases where the change can be accomplished by using the API
   * we are able to gracefully move the map to a new state rather than
   * rebuilding it.
   *
   * For properties which we are monitoring, we will only make a change
   * if there was indeed change.
   *
   * For the the properties in **zoomToConfig** (see `IZoomToConfig`), changes will be
   * moved in animated manner.
   */
  reconfigure() {
    if (this._map) {
      if (this.zoomLevel && this.zoomLevel !== this._zoomLevel) {
        this._map.setZoom(this.zoomLevel)
        this._zoomLevel = this.zoomLevel
      }

      if (this.center && coordinatesNotEqual(this._center, this.center)) {
        if (this.panTo) {
          this._map.panTo(this.center)
        } else {
          this._map.setCenter(this.center)
        }
        this._center = this.center
      }

      if (this.theme) {
        const styles = theme[this.theme] as IMapTypeStyle[]
        this._map.setOptions({ styles })
      }
    }
  }

  async draw() {
    const map = new this._api.maps.Map(this.$el, this._mapConfig())
    this._map = map
    this._zoomListener = map.addListener('zoom_changed', () => {
      const level = (this._map as IMap).getZoom()
      this.$emit('map:zoom-level', level)
    })

    this._centerListener = map.addListener('center_changed', () => {
      const center = makeCoordLiteral((this._map as IMap).getCenter())
      this.$emit('map:center', center)
    })

    // MARKERS SETUP
    if (this.markers) {
      this.markers.forEach(m => {
        const marker = new google.maps.Marker({ ...m, map: this._map })
        if (!this._markers) {
          this._markers = {}
        }
        this._markers[m.id] = marker
      })
    }
  }

  async redraw() {
    this.teardownListeners()
    await this.draw()
  }

  teardownListeners() {
    if (this._zoomListener) {
      this._api.maps.event.removeListener(this._zoomListener)
    }

    if (this._centerListener) {
      this._api.maps.event.removeListener(this._centerListener)
    }
  }

  async mounted() {
    this._api = await loadNow('places', this.apiKey)
    await this.draw()
    this.$emit('google-maps-ready')
    this.ready = true
  }

  async beforeDestroy() {
    this.teardownListeners()
  }

  private control(name: keyof GoogleMap, knownAs?: string) {
    const value = this[name]
    return this[name] && this[name] > 0
      ? {
          [`${knownAs || name}Control`]: true,
          [`${knownAs || name}ControlOptions`]: { position: value },
        }
      : { [`${knownAs || name}Control`]: false }
  }
}
</script>

<style lang="scss" module>
.isExpanded {
  height: 500px;
}
.expand {
  position: absolute;
  cursor: pointer;
  margin: 3px;
  padding: 0px;
  user-select: none;
  border-radius: 2px;
  height: 50px;
  width: 50px;
  background: none;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 45px !important;
  left: 2px !important;
}
</style>
