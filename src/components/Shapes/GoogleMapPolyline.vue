<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IGoogleApi } from '../loader/GoogleMapConnection'
import { POLYGON_PATH_CONFIG } from './shape-defaults'

@Component
export default class GoogleMapPolyLine extends Vue {
  @Prop() google!: IGoogleApi
  @Prop() map!: google.maps.Map
  @Prop() paths!: any[]

  mounted() {
    //    console.log('paths', this.paths, this.map)
    const { Polygon } = this.google.maps
    new Polygon({
      paths: this.paths,
      map: this.map,
      ...POLYGON_PATH_CONFIG,
    })
  }

  render() {}
}
</script>
