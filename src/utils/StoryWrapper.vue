<template>
  <div class="story-wrapper outer" :style="style">
    <div class="inner" :style="innerStyle">
      <slot v-on:$listeners="eventHappened"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IDictionary } from 'common-types'

/**
 * Wraps a story in a consistent fashion
 */
@Component
export default class StoryWrapper extends Vue {
  @Prop() backgroundColor?: string
  @Prop() isFullWidthComponent?: boolean
  @Prop() componentWidth?: string
  @Prop() componentBorder?: string
  @Prop() aspectRatio?: number

  get style() {
    let style = ''
    if (this.componentWidth && this.componentWidth.includes('100%')) {
      style += ` padding: 0;`
    } else {
      style += ` padding: 1rem;`
    }
    if (this.backgroundColor) {
      style = `${style} background-color: ${this.backgroundColor};`
    }

    return style
  }

  get innerStyle() {
    let style = ''
    if (this.componentBorder) {
      style += ` ${this.componentBorder};`
    }
    if (this.componentWidth) {
      style += ` width: ${this.componentWidth};`
      if (this.componentWidth.slice(-1) === '%') {
        style += ` height: ${this.componentWidth}; `
      }
    }
    if (this.aspectRatio && this.aspectRatio !== 0) {
      if (
        typeof this.componentWidth === 'number' ||
        (typeof this.componentWidth === 'string' && this.componentWidth.slice(-2) == 'px')
      ) {
        style += ` height: calc(${String(this.componentWidth)} * (1/${this.aspectRatio});`
      } else {
        this.$nextTick(() => {
          const width = this.$el.clientWidth
          style += ` height: calc(${width}px * (1/${this.aspectRatio});`
        })
      }
    }

    return style
  }

  eventHappened(...args: any[]) {
    //
  }
}
</script>

<style scoped>
.story-wrapper.outer {
  width: 100%;
  height: 100%;
}
</style>
