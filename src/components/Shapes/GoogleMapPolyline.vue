<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IPolylineOptions, Polyline, polylineEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMapExtension from './GoogleMapExtension.vue'
import isEqual from 'lodash.isequal'

@Component
export default class GoogleMapPolyline extends GoogleMapExtension {
  @Prop() polyline!: IPolylineOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated polyline class */
  protected _polyline?: Polyline

  @Watch('polyline', { deep: true, immediate: true })
  async onConfigChanged(oldConfig: IPolylineOptions, newConfig: IPolylineOptions) {
    if (!isEqual(oldConfig, newConfig)) {
      if (!this.map || !this.api) {
        await this.prep()
      }

      if (this._polyline) {
        this.api.event.clearInstanceListeners(this._polyline)
        this._polyline.setMap(null)
      }

      let polyline: IPolylineOptions

      if (!this.polyline) {
        console.warn(`A GoogleMapPolyline component was instantiated without any polyline config!`, { context: this })
      }

      polyline = this.polyline

      if (polyline && !polyline.path) {
        console.info(
          `A GoogleMapPolyline component was added but didn't have any path info. This is typically a mistake.`,
          { polyline },
        )
      }

      this.draw(polyline)
    }
  }

  draw(polyline: IPolylineOptions) {
    if (polyline) {
      this._polyline = new this.api.Polyline({ ...(polyline as IPolylineOptions), map: this.map }) as Polyline
      polylineEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._polyline as Polyline).addListener(evt, this.callbacks[evt])
        }
        (this._polyline as Polyline).addListener(evt, () => this.$emit(evt.replace('_', ':')))
      })
    }
  }

  beforeDestroy() {
    if (this._polyline) {
      // remove from map
      this.api.event.clearInstanceListeners(this._polyline)
      this._polyline.setMap(null)
    }
  }

  render() {}
}
</script>
