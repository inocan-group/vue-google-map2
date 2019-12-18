<script lang="ts">
import { Watch, Component, Vue, Prop } from 'vue-property-decorator'
import { IMap, IMapApi, IMapsEventListener } from '../map-types'
import GoogleMap from '../GoogleMap.vue'
import { IDictionary } from 'common-types'

@Component
export default class GoogleMapExtension extends Vue {
  protected map!: IMap
  protected api!: IMapApi
  protected listeners!: IDictionary<IMapsEventListener>

  /**
   * Prep's the object by ensuring that
   *
   * 1. the `map` property is set and available
   * 2. the `api` property is set and available
   *
   * With this basis, all operations should be easily achieved
   */
  async prep() {
    this.map = (await (this.$parent as GoogleMap).getMap()) as IMap
    this.api = (await (this.$parent as GoogleMap).getApi()) as IMapApi
    this.listeners = {}
  }

  /**
   * Provides the same API surface to children of the children
   */
  async getMap() {
    if (!this.map) {
      await this.prep()
    }
    return this.map
  }

  /**
   * Provides the same API surface to children of the children
   */
  async getApi() {
    if (!this.map) {
      await this.prep()
    }
    return this.api
  }
}
</script>
