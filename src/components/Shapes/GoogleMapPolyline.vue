<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IPolylineOptions, Polyline, polylineEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMap from '../GoogleMap.vue'
import GoogleMapExtension from './GoogleMapExtension.vue'

@Component
export default class GoogleMapPolyline extends GoogleMapExtension {
  @Prop() polyline!: string | IPolylineOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated polyline class */
  protected _polyline?: Polyline

  async mounted() {
    await this.prep()
    let polyline: IPolylineOptions

    if (!this.polyline) {
      console.warn(`A GoogleMapPolyline component was instantiated without any polyline config!`, { context: this })
    }
    if (typeof this.polyline === 'string') {
      try {
        polyline = JSON.parse(this.polyline) as IPolylineOptions
      } catch (e) {
        throw new Error(
          `A GoogleMapPolyline component was passed a "string" value for the polyline parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.polyline}`,
        )
      }
    } else {
      polyline = this.polyline
    }

    if (polyline && !polyline.path) {
      console.info(
        `A GoogleMapPolyline component was added but didn't have any path info. This is typically a mistake.`,
        { polyline },
      )
    }

    this.draw(polyline)
  }

  draw(polyline: IPolylineOptions) {
    if (polyline) {
      this._polyline = new this.api.Polyline({ ...(polyline as IPolylineOptions), map: this.map }) as Polyline
      polylineEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._polyline as Polyline).addListener(evt, this.callbacks[evt])
        }
      })
    }
  }

  beforeDestroy() {
    if (this._polyline) {
      // remove from map
      this._polyline.setMap(null)
    }
  }

  render() {}
}
</script>
