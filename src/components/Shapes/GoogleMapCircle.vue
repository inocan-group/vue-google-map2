<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ICircleOptions, Circle, circleEvents } from '../map-types'
import { IDictionary } from 'common-types'
import GoogleMapExtension from './GoogleMapExtension.vue'
import isEqual from 'lodash.isequal'

@Component
export default class GoogleMapCircle extends GoogleMapExtension {
  @Prop() circle!: ICircleOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated circle class */
  protected _circle?: Circle

  @Watch('circle', { deep: true, immediate: true })
  async onConfigChanged(oldConfig: ICircleOptions, newConfig: ICircleOptions) {
    if (!isEqual(oldConfig, newConfig)) {
      if (!this.map || !this.api) {
        await this.prep()
      }

      if (this._circle) {
        this.api.event.clearInstanceListeners(this._circle)
        this._circle.setMap(null)
      }

      let circle: ICircleOptions

      if (!this.circle) {
        console.warn(`A GoogleMapCircle component was instantiated without any circle config!`, { context: this })
      }

      circle = this.circle

      if (circle && (!circle.center || !circle.radius)) {
        console.info(
          `A GoogleMapCircle component was added but didn't have center and radius info. This is typically a mistake.`,
          { circle },
        )
      }

      this.draw(circle)
    }
  }

  draw(circle: ICircleOptions) {
    if (circle) {
      this._circle = new this.api.Circle({ ...(circle as ICircleOptions), map: this.map }) as Circle
      circleEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._circle as Circle).addListener(evt, this.callbacks[evt])
        }
        (this._circle as Circle).addListener(evt, () => this.$emit(evt.replace('_', ':')))
      })
    }
  }

  beforeDestroy() {
    if (this._circle) {
      // remove from map
      this.api.event.clearInstanceListeners(this._circle)
      this._circle.setMap(null)
    }
  }

  render() {}
}
</script>
