<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IRectangleOptions, Rectangle, rectangleEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMap from '../GoogleMap.vue'
import GoogleMapExtension from './GoogleMapExtension.vue'

@Component
export default class GoogleMapRectangle extends GoogleMapExtension {
  @Prop() rectangle!: string | IRectangleOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated rectangle class */
  protected _rectangle?: Rectangle

  async mounted() {
    await this.prep()
    let rectangle: IRectangleOptions

    if (!this.rectangle) {
      console.warn(`A GoogleMapRectangle component was instantiated without any rectangle config!`, { context: this })
    }
    if (typeof this.rectangle === 'string') {
      try {
        rectangle = JSON.parse(this.rectangle) as IRectangleOptions
      } catch (e) {
        throw new Error(
          `A GoogleMapRectangle component was passed a "string" value for the rectangle parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.rectangle}`,
        )
      }
    } else {
      rectangle = this.rectangle
    }

    if (rectangle && !rectangle.bounds) {
      console.info(
        `A GoogleMapRectangle component was added but didn't have any bounds info. This is typically a mistake.`,
        { rectangle },
      )
    }

    this.draw(rectangle)
  }

  draw(rectangle: IRectangleOptions) {
    if (rectangle) {
      this._rectangle = new this.api.Rectangle({ ...(rectangle as IRectangleOptions), map: this.map }) as Rectangle
      rectangleEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._rectangle as Rectangle).addListener(evt, this.callbacks[evt])
        }
      })
    }
  }

  beforeDestroy() {
    if (this._rectangle) {
      // remove from map
      this._rectangle.setMap(null)
    }
  }

  render() {}
}
</script>
