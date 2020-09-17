<script lang="ts">
import Vue from 'vue';
import { VueGoogleMap2Sample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueGoogleMap2Sample,
  }
});
</script>

<template>
  <div id="app">
    <vue-google-map2-sample />
  </div>
</template>
