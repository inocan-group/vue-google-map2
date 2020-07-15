import { withWrapperKnobs } from '@/utils/WrapperKnobs'

const dynamicProps = `
  :center="center"
  :panTo="panTo"
  :theme="theme"
  :zoomLevel="zoomLevel"
  :fullscreen="fullscreen"
  :zoomControl="zoomControl"
  :mapTypeControl="mapTypeControl"
  :streetView="streetView"`

export const basicTemplate = () =>
  withWrapperKnobs(`
    <GoogleMap
        v-on="$listeners"
        apiKey=''
        ${dynamicProps}
    />
`)

export const templateMarkerBasics = () => {
  return withWrapperKnobs(`
<google-map
  apiKey=''
   ${dynamicProps}
>
  <google-map-marker marker='{ "position": { "lat": 33.448376, "lng": -112.074036 }, "label": "S" }'  />

  <google-map-marker v-for="marker in markers" :key="marker.title" :marker="marker" />
  <google-map-marker v-for="marker in customIcons" :key="marker.id" :marker="marker" />
  <google-map-marker v-for="marker in externalImages" :key="marker.id" :marker="marker" />
</google-map>
`)
}
