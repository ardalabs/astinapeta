<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart v-if="hover" :wilayah="prov"/>
    <img
      class="top-right"
      height="100px"
      src="~/assets/img/logo.png"
      alt=""
      srcset=""
    />
    <nuxt-link class="top-left" to="/regencies/0/districts/0">
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
      hover:false,
      prov:'',
      lastFeature:'',
      geoJson:{}
    }
  },
  methods: {
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0];
            if (f.properties.NAMOBJ !== this.lastFeature) {
              this.prov = e.features[0].properties.NAMOBJ
              this.hover = true
              this.lastFeature = f.properties.NAMOBJ;

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
        'fill-color': ['match', ['get', 'NAMOBJ']],
        'fill-opacity': 0.4,
      }
      this.geoJson.features.forEach((element) => {
        if (!this.paintData['fill-color'].includes(element.properties.NAMOBJ) && element.properties.WADMKC === "KOTA") {
          const randColor = ['#fff000', '#003cff', '#f10b00', '#00ff11']
          this.paintData['fill-color'].push(element.properties.NAMOBJ)
          this.paintData['fill-color'].push(randColor[this.getRndInteger(0, 4)])
        }
      })
      this.paintData['fill-color'].push('rgba(245, 40, 145, 0)')
      console.log(this.paintData)
    },
  },
  mounted() {
    this.generatePaint()
    this.getMap()
  },
}
</script>
