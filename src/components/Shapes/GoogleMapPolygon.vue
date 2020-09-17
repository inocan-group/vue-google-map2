<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IPolygonOptions, Polygon, polygonEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMapExtension from './GoogleMapExtension.vue'
import isEqual from 'lodash.isequal'

@Component
export default class GoogleMapPolygon extends GoogleMapExtension {
  @Prop() polygon!: IPolygonOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated polygon class */
  protected _polygon?: Polygon

  @Watch('polygon', { deep: true, immediate: true })
  async onConfigChanged(oldConfig: IPolygonOptions, newConfig: IPolygonOptions) {
    if (!isEqual(oldConfig, newConfig)) {
      if (!this.map || !this.api) {
        await this.prep()
      }

      if (this._polygon) {
        this.api.event.clearInstanceListeners(this._polygon)
        this._polygon.setMap(null)
      }

      let polygon: IPolygonOptions

      if (!this.polygon) {
        console.warn(`A GoogleMapPolygon component was instantiated without any polygon config!`, { context: this })
      }

      polygon = this.polygon

      if (polygon && !polygon.paths) {
        console.info(
          `A GoogleMapPolygon component was added but didn't have any paths info. This is typically a mistake.`,
          { polygon },
        )
      }

      this.draw(polygon)
    }
  }

  draw(polygon: IPolygonOptions) {
    if (polygon) {
      this._polygon = new this.api.Polygon({ ...(polygon as IPolygonOptions), map: this.map }) as Polygon
      polygonEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._polygon as Polygon).addListener(evt, this.callbacks[evt])
        }
        (this._polygon as Polygon).addListener(evt, () => this.$emit(evt.replace('_', ':')))
      })
    }
  }

  beforeDestroy() {
    if (this._polygon) {
      // remove from map
      this.api.event.clearInstanceListeners(this._polygon)
      this._polygon.setMap(null)
    }
  }

  render() {}
}
</script>
