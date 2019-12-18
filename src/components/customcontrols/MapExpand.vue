<template>
  <div
    class="google-map-expand-component"
    @click="toggle()"
  />
  <!-- :style="{ backgroundImage: 'url(' + require('../assets/svgs/expand.svg') + ')' }" -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

/**
 * Sends events to the parent about expand/contract events
 */
@Component
export default class MapExpand extends Vue {
  expanded = false
  toggle() {
    this.expanded = !this.expanded
    if (this.expanded) {
      this.$emit('map:expand')
    } else {
      this.$emit('map:contract')
    }
  }

  mounted() {
    console.log('map-expand mounted')
  }
}
</script>

<style>
.google-map-expand-component {
  position: relative;
  cursor: pointer;
  margin: 3px;
  padding: 0px;
  user-select: none;
  border-radius: 2px;
  height: 50px;
  width: 50px;
  background: none;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 100px !important;
  left: 2px !important;
}
</style>
