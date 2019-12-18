# `GoogleMaps` components

The `GoogleMap` component and it's helper components are intended to provide a flexible means to display maps using the Google API.

## Basic Usage

The example below will add a google map which fills the available space provided by the containing DOM (aka, _width_ and _height_ are 100%). It will be located geographically based on the `center` coordinates provided and be zoomed to a level specified by `zoomLevel`.

```html
<google-map :center="center" :zoomLevel="zoomLevel" />
```

This is all _very_ basic but to step into more advanced situations we should step into that in sections:

1. **Base Config** - The look and feel of the map can be initialized by sending in a _base_ configuration.
2. **Themes** - The overall look and feel starts with the base config (although that is optional) but can then be moved between some standard starting point based on a preset number of "themes".
3. **Controls** - the base config can state what visual controls you want displayed as overlays to the map (zoom, satalite, streetview, etc.) but with the appropriate properties you can not only state this more easily but also modify this behavior dynamically as you see fit.
4. **Messaging** - there are certain parameters which are VERY likely to be manipulated by the containing component while at the same time some control be given over to the user; these include `center` and `zoomLevel` as illustrated in the example above. The properties exposed by this component are _not_ setup as two way bindings but you have the ability to setup two-way bindings if you need them.
5. **Shapes** - by leveraging VueJS's powerful **slots** functionality the `GoogleMap` component exposes a huge amount of flexibility in drawing _lines_, _polylines_, _rectangles_, etc.
6. **Custom Overlays** - beyond the built-in classes provided, you can also add your own custom components to add as overlays to the map.

To round out this introduction, let's take at a look at a more advanced example of how you might use this component:

```html
<google-maps
    apiKey='dfdfsfadsfewc564H_u_ZrUOQk'
    :theme="theme"
    :center="center"
    @map:center="userCentered"
    :zoomLevel="zoomLevel"
    @map:zoomLevel="userZoomed"
    :panTo="panTo"
    :fullscreen="fullscreen"
    :zoomControl="zoomControl"
    :mapTypeControl="mapTypeControl"
    :streetView="streetView"
>

    <google-line v-for="line in lines" :key="line.id" />
    <google-marker v-for="marker in markers" :key="marker.id" />

</google-maps>
```
