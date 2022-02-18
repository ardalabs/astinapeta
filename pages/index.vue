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
  </div>
</template>

<script>
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data() {
    return {
      paintData: {},
      prov: '',
      hover: false,
      lastFeature: '',
      geoJson: {
        type: 'FeatureCollection',
        features: [],
      },
    }
  },
  methods: {
    async getData() {
      await this.$axios.get('/v1/geo/province').then((res) => {
        this.geoJson.features = res.data.data
        console.log('geo',this.geoJson);
      })
    },
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        this.$router.push('/regencies/' + e.features[0].properties.province)
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.province !== this.lastFeature) {
          this.prov = e.features[0].properties.province
          this.hover = true
          this.lastFeature = f.properties.province
        }
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
        'fill-color': ['match', ['get', 'province']],
        'fill-opacity': 0.4,
      }
      this.geoJson.features.forEach((element) => {
        const randColor = ['#fff000', '#003cff', '#f10b00', '#00ff11']
        this.paintData['fill-color'].push(element.properties.province)
        this.paintData['fill-color'].push(randColor[this.getRndInteger(0, 4)])
      })
      this.paintData['fill-color'].push('#0000ff')
      console.log('paint',this.paintData)
    },
  },
  mounted() {
    this.getData().then(() => {
      this.generatePaint()
      this.getMap()
    })
  },
}
</script>
