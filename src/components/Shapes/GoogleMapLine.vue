<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IGoogleApi } from '../loader/GoogleMapConnection'
import { LINE_PATH_CONFIG } from './shape-defaults'

@Component
export default class GoogleMapLine extends Vue {
  @Prop() google!: IGoogleApi
  @Prop() map!: google.maps.Map
  @Prop() path!: any[]

  mounted() {
    const { Polyline } = this.google.maps
    new Polyline({
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG,
    })
  }

  render() {}
}
</script>
