<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart v-if="hover" :wilayah="prov" :dataChart="dataChart" />
    <img
      class="top-right"
      height="100px"
      src="~/assets/img/logo.png"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
import { geoJson } from './geoJson'
import { dprri } from './dprri'
import { party } from './party'
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
      const map = this.$mapgl(geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        const idwil = this.search(e.features[0].properties.province, masterprov)
        this.$router.push('/regencies/' + idwil.id)
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.province !== this.lastFeature) {
          if (this.prov !== e.features[0].properties.province) {
            this.hover = false
          }
          this.prov = e.features[0].properties.province
          const provinfo = this.search(
            e.features[0].properties.province,
            masterprov
          )
          if (provinfo) {
            this.dataChart = []
            if (dprri.table[provinfo.id]) {
              for (let index = 0; index < 20; index++) {
                if (dprri.table[provinfo.id][index + 1]) {
                  this.dataChart.push(dprri.table[provinfo.id][index + 1])
                } else {
                  this.dataChart.push(0)
                }
              }
            }
          }

          this.hover = true
          this.lastFeature = f.properties.province
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
        'fill-color': ['match', ['get', 'province']],
        'fill-opacity': 1,
      }
      geoJson.features.forEach((element) => {
        // console.log('elprop',element.properties.province);
        const idwil = this.search(element.properties.province, masterprov)
        if (idwil) {
          let highest = 0;
          let highestkey = '';
          Object.keys(dprri.table[idwil.id]).forEach((key) => {
            if(key!=='persen'){
              if(highest<dprri.table[idwil.id][key]){
                highest = dprri.table[idwil.id][key]
                highestkey = key
              }
            }
          })
          if(highestkey && element.properties.province){
            this.paintData['fill-color'].push(element.properties.province)
            this.paintData['fill-color'].push(party[highestkey].warna)
          }
        }
      })
      this.paintData['fill-color'].push('#000000')
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
