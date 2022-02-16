<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <div v-if="hover" class="legend pb-3">
      <div class="container-fluid">
        <div class="card bg-light p-3 px-5">
          <div>
            {{ prov }}
          </div>
          <div class="d-flex justify-content-around">
            <div class="card bg-white p-1">
              <div class="card-body">
                <img
                  style="height: 25px; width: auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Partai_NasDem.svg/640px-Partai_NasDem.svg.png"
                />
                <strong>{{ getRndInteger(10, 50) }}%</strong>
                ({{ getRndInteger(10, 100) }} Kursi)
              </div>
            </div>
            <div class="card bg-white p-1">
              <div class="card-body">
                <img
                  style="height: 25px; width: auto"
                  src="https://awsimages.detik.net.id/community/media/visual/2019/04/15/0ed3f774-4eb9-4275-b7f2-9b514f9676e9_11.jpeg?w=1200"
                />
                <strong>{{ getRndInteger(10, 50) }}%</strong>
                ({{ getRndInteger(10, 100) }} Kursi)
              </div>
            </div>
            <div class="card bg-white p-1">
              <div class="card-body">
                <img
                  style="height: 25px; width: auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Logo_of_the_Democratic_Party_%28Indonesia%29.svg/1200px-Logo_of_the_Democratic_Party_%28Indonesia%29.svg.png"
                />
                <strong>{{ getRndInteger(10, 50) }}%</strong>
                ({{ getRndInteger(10, 100) }} Kursi)
              </div>
            </div>
            <div class="card bg-white p-1">
              <div class="card-body">
                <img
                  style="height: 25px; width: auto"
                  src="https://kilasjatim.com/wp-content/uploads/2019/01/Screenshot_2019-01-31-11-15-11-814_com.android.chrome.jpg"
                />
                <strong>{{ getRndInteger(10, 50) }}%</strong>
                ({{ getRndInteger(10, 100) }} Kursi)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="top-left" height="100px" src="https://i0.wp.com/www.dprd-ponorogo.go.id/wp-content/uploads/2021/10/Partai-Nasdem-Preview.png?fit=501%2C301&ssl=1" alt="" srcset="">
    
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
      prov: '',
      hover: false,
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

      map.on('mouseenter', 'area-boundary', (e) => {
        this.prov = e.features[0].properties.Propinsi
        this.hover = true
      })
      map.on('mouseleave', 'area-boundary', (e) => {
        this.prov = ''
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
  },
  mounted() {
    this.generatePaint()
    this.getMap()
  },
}
</script>
