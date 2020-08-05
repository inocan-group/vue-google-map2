<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import GoogleMapExtension from '../Shapes/GoogleMapExtension.vue'

@Component
export default class GoogleMapCustomControl extends GoogleMapExtension {
  @Prop({ default: 'TOP_LEFT' }) position!: keyof typeof google.maps.ControlPosition
  @Prop() index?: number

  async created() {
    await this.prep()

    if (this.index) {
      (this.$el as Element & { index: number }).index = this.index
    }

    this.map.controls[google.maps.ControlPosition[this.position]].push(this.$el)
  }
}
</script>
