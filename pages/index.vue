<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { geoJson } from './geoJson'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data() {
    return {
      paintData: {},
    }
  },
  methods: {
    getMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZmFyaXozMTMiLCJhIjoiY2t6cDE4aXB5MjBxMDJvbnh6cTY5dHhzciJ9.mgc1iru7ABp6eaFTEfQQ_Q'
      // eslint-disable-next-line no-unused-vars
      const map = new mapboxgl.Map({
        container: 'map-conatiner',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [116.825264, -1.26916],
        zoom: 3,
      })
      map.on('load', () => {
        const layers = map.getStyle().layers
        let firstSymbolId
        for (const layer of layers) {
          if (layer.type === 'symbol') {
            firstSymbolId = layer.id
            break
          }
        }

        console.log(geoJson)
        map.addSource('area-geo', {
          type: 'geojson',
          data: geoJson,
        })

        map.addLayer(
          {
            id: 'area-boundary',
            type: 'fill',
            source: 'area-geo',
            paint: this.paintData,
            filter: ['==', '$type', 'Polygon'],
          },
          firstSymbolId
        )
        map.addLayer(
          {
            id: 'route',
            type: 'line',
            source: 'area-geo',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#000000',
              'line-width': 1.5,
              'line-opacity': 0.5,
            },
          },
          firstSymbolId
        )
      })
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    generatePaint() {
      this.paintData = {
        'fill-color': ['match', ['get', 'Propinsi']],
        'fill-opacity': 0.4,
      }
      geoJson.features.forEach((element) => {
        const randColor = ['#fff000', '#003cff', '#f10b00', '#00ff11']
        this.paintData['fill-color'].push(element.properties.Propinsi)
        this.paintData['fill-color'].push(randColor[this.getRndInteger(0, 4)])
      })
      this.paintData['fill-color'].push('#0000ff')
      console.log(this.paintData)
    },
  },
  mounted() {
    this.generatePaint()
    this.getMap()
  },
}
</script>
