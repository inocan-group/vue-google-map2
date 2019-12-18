<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IGoogleApi } from '../loader/GoogleMapConnection'
import { POLYLINE_PATH_CONFIG } from './shape-defaults'
import { IPolylineOptions, Polyline } from '../map-types';
import GoogleMapExtension from './GoogleMapExtension.vue';

@Component
export default class GoogleMapPolyLine extends GoogleMapExtension {
  @Prop() polyline!: string | IPolylineOptions
  @Watch('polyline') onPolylineChange() {
    if (this._polyline) {
      this._polyline.setOptions(this.polyline as IPolylineOptions)
    }
  }

  /** the instantiated marker class */
  protected _polyline?: Polyline

  async mounted() {
    await this.prep()
    let polyline: IPolylineOptions

    if (!this.polyline) {
      console.warn(
        `A GoogleMapPolyline component was instantiated without any polyline config!`,
        { context: this }
      );
    }
    if (typeof this.polyline === "string") {
      try {
        polyline = JSON.parse(this.polyline) as IPolylineOptions;
      } catch (e) {
        throw new Error(
          `A GoogleMapPolyline component was passed a "string" value for the polyline parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.polyline}`
        );
      }
    } else {
      polyline = this.polyline;
    }
    this.draw(polyline);
  }

  draw(polyline: IPolylineOptions) {
    if (polyline) {
      this._polyline = new this.api.Polyline({
        ...POLYLINE_PATH_CONFIG,
        ...(polyline as IPolylineOptions),
        map: this.map,
      }) as Polyline
    }
  }

  beforeDestroy() {
    if (this._polyline) {
      // remove from map
      this._polyline.setMap(null);
    }
  }

  render() {}
}
</script>
