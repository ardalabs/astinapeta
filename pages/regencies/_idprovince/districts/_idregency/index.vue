<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <img
      class="top-right"
      height="100px"
      src="https://i0.wp.com/www.dprd-ponorogo.go.id/wp-content/uploads/2021/10/Partai-Nasdem-Preview.png?fit=501%2C301&ssl=1"
      alt=""
      srcset=""
    />
    <nuxt-link class="top-left" to="/regencies/0">
      <img
        height="100%"
        src="http://cdn.onlinewebfonts.com/svg/img_490217.png"
        alt=""
        srcset=""
      />
    </nuxt-link>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { kecJson } from './kecJson'
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

        console.log(kecJson)
        map.addSource('area-geo', {
          type: 'geojson',
          data: kecJson,
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
      map.on('click', 'area-boundary', (e) => {
        window.open('/regencies/0/districts/0/villages/' + e.features[0].properties.NAMAOBJ, 'newwindow')
      })

      map.on('mouseenter', 'area-boundary', (e) => {
        map.getCanvas().style.cursor = 'pointer'
      })
      const coordinates = [
        [111.94700640803094, -7.768076305331418],
        [112.08376620243607, -7.9269329259617],
      ]
      // Create a 'LngLatBounds' with both corners at the first coordinate.
      const bounds = new mapboxgl.LngLatBounds(
        [111.92813787110968, -7.758769538628023],
        [112.10670330170493, -7.9367982630718075]
      )

      // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
      for (const coord of coordinates) {
        bounds.extend(coord)
      }

      map.fitBounds(bounds, {
        padding: 20,
      })
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    generatePaint() {
      this.paintData = {
        'fill-color': ['match', ['get', 'WADMKC']],
        'fill-opacity': 0.4,
      }
      kecJson.features.forEach((element) => {
        if (!this.paintData['fill-color'].includes(element.properties.WADMKC)) {
          const randColor = ['#fff000', '#003cff', '#f10b00', '#00ff11']
          this.paintData['fill-color'].push(element.properties.WADMKC)
          this.paintData['fill-color'].push(randColor[this.getRndInteger(0, 4)])
        }
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
