<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IPolygonOptions, Polygon, polygonEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMap from '../GoogleMap.vue'
import GoogleMapExtension from './GoogleMapExtension.vue'

@Component
export default class GoogleMapPolygon extends GoogleMapExtension {
  @Prop() polygon!: string | IPolygonOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated polygon class */
  protected _polygon?: Polygon

  async mounted() {
    await this.prep()
    let polygon: IPolygonOptions

    if (!this.polygon) {
      console.warn(`A GoogleMapPolygon component was instantiated without any polygon config!`, { context: this })
    }
    if (typeof this.polygon === 'string') {
      try {
        polygon = JSON.parse(this.polygon) as IPolygonOptions
      } catch (e) {
        throw new Error(
          `A GoogleMapPolygon component was passed a "string" value for the polygon parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.polygon}`,
        )
      }
    } else {
      polygon = this.polygon
    }

    if (polygon && !polygon.paths) {
      console.info(
        `A GoogleMapPolygon component was added but didn't have any paths info. This is typically a mistake.`,
        { polygon },
      )
    }

    this.draw(polygon)
  }

  draw(polygon: IPolygonOptions) {
    if (polygon) {
      this._polygon = new this.api.Polygon({ ...(polygon as IPolygonOptions), map: this.map }) as Polygon
      polygonEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._polygon as Polygon).addListener(evt, this.callbacks[evt])
        }
      })
    }
  }

  beforeDestroy() {
    if (this._polygon) {
      // remove from map
      this._polygon.setMap(null)
    }
  }

  render() {}
}
</script>
