<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart v-if="hover" :wilayah="prov" />
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
      hover: false,
      prov: '',
      lastFeature: '',
    }
  },
  methods: {
    async getGeoData() {
      await this.$axios
        .get('/v1/geo/featuredmap/' + this.$route.params.idprovince + '/1')
        .then((res) => {
          this.geoJson = res.data.data
        })
    },
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        this.$router.push(
          '/regencies/0/districts/0/villages/' +
            e.features[0].properties.NAMAOBJ
        )
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.WADMKC !== this.lastFeature) {
          this.prov = e.features[0].properties.WADMKC
          this.hover = true
          this.lastFeature = f.properties.WADMKC

          // do something
        }
      })
      map.on('mouseleave', 'area-boundary', (e) => {
        this.prov = ''
        this.hover = false
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
