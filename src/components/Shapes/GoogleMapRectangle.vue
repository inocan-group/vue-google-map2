<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IRectangleOptions, Rectangle, rectangleEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMapExtension from './GoogleMapExtension.vue'
import isEqual from 'lodash.isequal'

@Component
export default class GoogleMapRectangle extends GoogleMapExtension {
  @Prop() rectangle!: IRectangleOptions
  /**
   * A dictionary containing callbacks to be hooked into the google maps event system. The
   * name of the property is the event's name.
  */
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated rectangle class */
  protected _rectangle?: Rectangle

  @Watch('rectangle', { deep: true, immediate: true })
  async onConfigChanged(oldConfig: IRectangleOptions, newConfig: IRectangleOptions) {
    if (!isEqual(oldConfig, newConfig)) {
      if (!this.map || !this.api) {
        await this.prep()
      }

      if (this._rectangle) {
        this.api.event.clearInstanceListeners(this._rectangle)
        this._rectangle.setMap(null)
      }

      let rectangle: IRectangleOptions

      if (!this.rectangle) {
        console.warn(`A GoogleMapRectangle component was instantiated without any rectangle config!`, { context: this })
      }

      rectangle = this.rectangle

      if (rectangle && !rectangle.bounds) {
        console.info(
          `A GoogleMapRectangle component was added but didn't have any bounds info. This is typically a mistake.`,
          { rectangle },
        )
      }

      this.draw(rectangle)
    }
  }

  draw(rectangle: IRectangleOptions) {
    if (rectangle) {
      this._rectangle = new this.api.Rectangle({ ...(rectangle as IRectangleOptions), map: this.map }) as Rectangle
      rectangleEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._rectangle as Rectangle).addListener(evt, this.callbacks[evt])
        }
        (this._rectangle as Rectangle).addListener(evt, () => this.$emit(evt.replace('_', ':')))
      })
    }
  }

  beforeDestroy() {
    if (this._rectangle) {
      // remove from map
      this.api.event.clearInstanceListeners(this._rectangle)
      this._rectangle.setMap(null)
    }
  }

  render() {}
}
</script>
