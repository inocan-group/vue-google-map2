import { storiesOf } from '@storybook/vue'
import { text, boolean, withKnobs, select, number } from '@storybook/addon-knobs'
import GoogleMap from '../GoogleMaps/GoogleMap.vue'
import GoogleMapMarker from '../GoogleMaps/Shapes/GoogleMapMarker.vue'
import StoryRouter from 'storybook-vue-router'
import StoryWrapper from '../../../utils/StoryWrapper.vue'
import { withWrapperKnobs } from '../../../utils/WrapperKnobs'
import { IDictionary } from 'firemock'
import MapExpand from './customcontrols/MapExpand.vue'
import { mapProps, basicTemplate, templateMarkerBasics, markerBasicsKnobs } from './StorySupport/index'
import markdown from './notes.md'
import { UserRoles } from '@/index'

const defaultConfig = (override: IDictionary = {}) => ({
  components: { GoogleMap, StoryWrapper },
  props: mapProps(override),
  template: basicTemplate(),
})

const markerConfig = (override: IDictionary = {}, template: any) => {
  return {
    components: { GoogleMap, StoryWrapper, GoogleMapMarker },
    props: {
      ...markerBasicsKnobs(override),
      ...mapProps({ theme: 'minimal', zoomLevel: 14, center: { lat: 33.448376, lng: -112.074036 } }),
    },
    template: template(),
  }
}

const expandConfig = () => ({
  components: { GoogleMap, StoryWrapper, MapExpand },
  props: mapProps(),
  template: withWrapperKnobs(`
        <GoogleMap
          v-on="$listeners"
          apiKey='AIzaSyD-AQKOVKFqVWF98qnYMvpFNH_u_ZrUOQk'
          :center="center"
          :markers="markers"
          :panTo="panTo"
          :theme="theme"
          :zoomLevel="zoomLevel"
          :fullscreen="fullscreen"
          :zoomControl="zoomControl"
          :mapTypeControl="mapTypeControl"
          :streetView="streetView"
        ><MapExpand /></GoogleMap>`),
})

storiesOf('MOVE|GoogleMap', module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('Getting Started', () => defaultConfig(), { notes: { markdown } })
  .add('Marker Basics', () =>
    markerConfig(
      { myMarker: { position: { lat: 33.448376, lng: -112.074036 }, label: 'testing' } },
      templateMarkerBasics,
    ),
  )
  .add('Marker Events and Subcomponents', () =>
    markerConfig(
      { myMarker: { position: { lat: 33.448376, lng: -112.074036 }, label: 'testing' } },
      templateMarkerBasics,
    ),
  )
  .add('Lines, Polylines, and Squares', () =>
    markerConfig(
      { myMarker: { position: { lat: 33.448376, lng: -112.074036 }, label: 'testing' } },
      templateMarkerBasics,
    ),
  )
  .add('Custom Components', () => expandConfig())
