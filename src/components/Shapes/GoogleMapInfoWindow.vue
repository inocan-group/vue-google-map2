<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IGoogleApi } from "../loader/GoogleMapConnection";
import { POLYGON_PATH_CONFIG } from "./shape-defaults";
import { IMap, IInfoWindowOptions, InfoWindow } from "../map-types";
import GoogleMap from "../GoogleMap.vue";
import GoogleMapExtension from "./GoogleMapExtension.vue";
import { IDictionary } from "common-types";

@Component
export default class GoogleMapInfoWindow extends GoogleMapExtension {
  @Prop() infoWindow!: string | IInfoWindowOptions
  @Watch('infoWindow') onInfoWindowChange() {
    if (this._infoWindow) {
      this._infoWindow.setOptions(this.infoWindow as IInfoWindowOptions)
      this._infoWindow.open(this.map)
    }
  }

  /** the instantiated infoWindow class */
  protected _infoWindow?: InfoWindow;

  async mounted() {
    await this.prep();
    let infoWindow: IInfoWindowOptions;

    if (!this.infoWindow) {
      console.warn(
        `A GoogleMapInfoWindow component was instantiated without any InfoWindow config!`,
        { context: this }
      );
    }
    if (typeof this.infoWindow === "string") {
      try {
        infoWindow = JSON.parse(this.infoWindow) as IInfoWindowOptions;
      } catch (e) {
        throw new Error(
          `A GoogleMapInfoWindow component was passed a "string" value for the infoWindow parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.infoWindow}`
        );
      }
    } else {
      infoWindow = this.infoWindow;
    }

    if (infoWindow && !infoWindow.position) {
      console.info(
        `A GoogleMapInfoWindow component was added but didn't have any position info. This is typically a mistake.`,
        { infoWindow }
      );
    }

    this.draw(infoWindow);
  }

  draw(infoWindow: IInfoWindowOptions) {
    if (infoWindow) {
      this._infoWindow = new this.api.InfoWindow({
        ...(infoWindow as IInfoWindowOptions),
      }) as InfoWindow
      this._infoWindow.open(this.map)
    }
  }

  beforeDestroy() {
    if (this._infoWindow) {
      // remove from map
      this._infoWindow.close()
    }
  }

  render() {}
}
</script>
