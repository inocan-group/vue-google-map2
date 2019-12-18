<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IGoogleApi } from './../loader/GoogleMapConnection'
import { COLORS } from '../map-defaults'

const DEFAULT_RECTANGLE: google.maps.RectangleOptions = {
  draggable: false,
  clickable: true,
  editable: false,
  visible: true,
  strokeColor: COLORS.DARK,
}

@Component
export default class GoogleMapLine extends Vue {
  @Prop() google!: IGoogleApi
  @Prop() map!: google.maps.Map
  @Prop() rectangle!: google.maps.LatLngBoundsLiteral
  /** optionally allows ability to override default settings */
  @Prop() config?: Partial<google.maps.RectangleOptions>

  mounted() {
    //console.log('Rect', this)

    const { Rectangle } = this.google.maps
    new Rectangle({
      bounds: this.rectangle,
      map: this.map,
      ...DEFAULT_RECTANGLE,
    })
  }

  render() {}
}
</script>
