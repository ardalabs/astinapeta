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
    <nuxt-link class="top-left" to="/">
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
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data() {
    return {
      paintData: {},
      hover: false,
      prov: '',
      lastFeature: '',
      geoJson:{
        type: 'FeatureCollection',
        features: [],
      }
    }
  },
  methods: {
    async getData() {
      await this.$axios.get('/v1/geo/province/'+this.$route.params.idprovince).then((res) => {
        this.geoJson.features = res.data.data
        console.log('geo',this.geoJson);
      })
    },
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        this.$router.push(
          '/regencies/32/districts/' + e.features[0].properties._id
        )
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.RegenciesName !== this.lastFeature) {
          this.hover = false
          this.prov = e.features[0].properties.RegenciesName
          this.hover = true
          this.lastFeature = f.properties.RegenciesName

          // do something
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
        'fill-color': ['match', ['get', 'Regencies']],
        'fill-opacity': 0.4,
      }
      this.geoJson.features.forEach((element) => {
        const randColor = ['#fff000', '#003cff', '#f10b00', '#00ff11']
        this.paintData['fill-color'].push(element.properties.Regencies)
        this.paintData['fill-color'].push(randColor[this.getRndInteger(0, 4)])
      })
      this.paintData['fill-color'].push('#0000ff')
      console.log('paintData',this.paintData)
    },
  },
  mounted() {
    this.getData().then(()=>{
      this.generatePaint()
      this.getMap()
    })
  },
}
</script>
