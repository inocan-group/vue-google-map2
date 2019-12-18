<template>
  <div class="container">
    <img class="logo" :src="require('@/assets/vue-map.svg')" alt="">
    <h1>Vue Maps</h1>
    <p>
      No content available at the moment...
    </p>
    <button v-for="(route, i) in routes" :key="route.id" :class="{
      ['active']: route.selected
    }" @click="selectRoute(i)">Select route {{i+1}}</button><br><br>
      <!-- v-on="$listeners"
      :center="center"
      :panTo="panTo"
      :theme="theme"
      :zoomLevel="zoomLevel"
      :fullscreen="fullscreen"
      :zoomControl="zoomControl"
      :mapTypeControl="mapTypeControl"
      :markers="ms.markers"
      :streetView="streetView" -->
    <GoogleMap style="height:500px;"
      apiKey='AIzaSyDRdC5ayB2snUW37qQP_6gHGVuxwbvlOIo'
      :map-config="ms.mapConfig"
      :fullscreen="ms.fullscreen"
      :markers="Object.values(ms.markers)"
      :polylines="ms.polylines"
    ></GoogleMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { routes } from './data'
import { MapService, IMapRoute } from './MapService'
import GoogleMap from '@/components/GoogleMap.vue'

@Component({
  components: {
    GoogleMap,
  }
})
export default class Home extends Vue {
  routes: IMapRoute[] = routes
  ms = new MapService(this.routes[0])
  showRoute1 = true
  created() {
    this.selectRoute(0)
    this.ms.setRoutes(this.routes)
  }
  selectRoute(routeNo: number) {
    this.routes.forEach((r, i) => r.selected = i === routeNo)
    this.ms.setRoutes(this.routes)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 60px;
}
h1 {
  padding: 2rem 0 0 0;
}
.logo {
  height: 150px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  background: #bedfd0;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  transition: all 0.5s;
  margin: 0 10px;
}
button:hover{
  transition: all 0.5s;
  background: #58cf9a;
}
button:focus {
  outline: none;
}
button.active {
  background: #42b983;
}
</style>