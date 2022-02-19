<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart v-if="hover" :wilayah="prov" :dataChart="dataChart" />
    <img
      class="top-right"
      height="100px"
      src="https://i0.wp.com/www.dprd-ponorogo.go.id/wp-content/uploads/2021/10/Partai-Nasdem-Preview.png?fit=501%2C301&ssl=1"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { geoJson } from './geoJson'
import { dprri } from './dprri'
import { masterprov } from './masterprov'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data() {
    return {
      paintData: {},
      prov: '',
      hover: false,
      lastFeature: '',
      dataChart: [],
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
            console.log(layer.type)
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

        const coordinates = [
          [95.0, 6.0],
          [141.0, -11.0],
        ]
        // Create a 'LngLatBounds' with both corners at the first coordinate.
        const bounds = new mapboxgl.LngLatBounds([95.0, 6.0], [141.0, -11.0])

        // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
        for (const coord of coordinates) {
          bounds.extend(coord)
        }

        map.fitBounds(bounds, {
          padding: 20,
        })
      })
      map.on('click', 'area-boundary', (e) => {
        this.$router.push('/regencies/' + e.features[0].properties.ID)
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.Propinsi !== this.lastFeature) {
          if(this.prov !== e.features[0].properties.Propinsi){
            this.hover = false
          }
          this.prov = e.features[0].properties.Propinsi
          const provinfo = this.search(
            e.features[0].properties.Propinsi,
            masterprov
          )
          if (provinfo) {
            this.dataChart = []
            if (dprri.table[provinfo.id]) {
              for (let index = 0; index < 20; index++) {
                if (dprri.table[provinfo.id][index+1]) {
                  this.dataChart.push(dprri.table[provinfo.id][index+1])
                } else {
                  this.dataChart.push(0)
                }
              }
            }
            console.log(this.dataChart)
          }
          
          this.hover = true
          this.lastFeature = f.properties.Propinsi
        }
      })
      map.on('mouseleave', 'area-boundary', (e) => {
        this.prov = ''
        this.dataChart = {}
        this.hover = false
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
    search(nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].namaWilayah === nameKey) {
          return myArray[i]
        }
      }
    },
  },
  mounted() {
    this.generatePaint()
    this.getMap()
  },
}
</script>
