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
        const idwil = this.search(e.features[0].properties.Propinsi, masterprov)
        this.$router.push('/regencies/' + idwil.id)
      })

      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.Propinsi !== this.lastFeature) {
          if (this.prov !== e.features[0].properties.Propinsi) {
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
                if (dprri.table[provinfo.id][index + 1]) {
                  this.dataChart.push(dprri.table[provinfo.id][index + 1])
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
        // console.log('elprop',element.properties.Propinsi);
        const idwil = this.search(element.properties.Propinsi, masterprov)
        if (idwil) {
          let highest = 0;
          let highestkey = '';
          // console.log('iid',idwil.id);
          // console.log('idwil',dprri.table[idwil.id]);
          Object.keys(dprri.table[idwil.id]).forEach((key) => {
            if(key!=='persen'){
              if(highest<dprri.table[idwil.id][key]){
                highest = dprri.table[idwil.id][key]
                highestkey = key
              }
            }
          })
          if(highestkey && element.properties.Propinsi){
            this.paintData['fill-color'].push(element.properties.Propinsi)
            this.paintData['fill-color'].push(party[highestkey].warna)
          }
        }
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
