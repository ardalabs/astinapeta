<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart v-if="hover" :wilayah="prov" :dataChart="dataChart" />
    <Loading v-if="loading" />
    <img
      class="top-right"
      height="100px"
      src="~/assets/img/logo.png"
      alt=""
      srcset=""
    />
    <nuxt-link class="top-left" to="/">
      <img
        height="100%"
        src="~/assets/img/back.png"
        alt=""
        srcset=""
      />
    </nuxt-link>
  </div>
</template>

<script>
import {party} from '../../party'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data() {
    return {
      paintData: {},
      hover: false,
      prov: '',
      lastFeature: '',
      geoJson: {},
      dprd: {},
      dataChart:[],
      loading:true
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
    async getPartyData() {
      await this.$axios
        .get('/v1/result/province/' + this.$route.params.idprovince)
        .then((res) => {
          this.dprd = res.data.data
        })
    },
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        this.$router.push(
          '/regencies/'+this.$route.params.idprovince+'/districts/' + e.features[0].properties.id_kabkota
        )
      })
      map.on('mousemove', 'area-boundary', (e) => {
        const f = map.queryRenderedFeatures(e.point)[0]
        if (f.properties.id_kabkota !== this.lastFeature) {
          if (this.prov !== e.features[0].properties.id_kabkota) {
            this.hover = false
          }
          this.prov = e.features[0].properties.nm_kabkota
            this.dataChart = []
            if (this.dprd.table[e.features[0].properties.id_kabkota]) {
              for (let index = 0; index < 20; index++) {
                if (this.dprd.table[e.features[0].properties.id_kabkota][index + 1]) {
                  this.dataChart.push(this.dprd.table[e.features[0].properties.id_kabkota][index + 1])
                } else {
                  this.dataChart.push(0)
                }
              }
            console.log(this.dataChart)
          }

          this.hover = true
          this.lastFeature = f.properties.id_kabkota
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
        'fill-color': ['match', ['get', 'id_kabkota']],
        'fill-opacity': 1,
      }
      console.log(this.geoJson.features);
      this.geoJson.features.forEach((element) => {
        let highest = 0
        let highestkey = ''
        Object.keys(this.dprd.table[element.properties.id_kabkota]).forEach((key) => {
          if (key !== 'persen') {
            if (highest < this.dprd.table[element.properties.id_kabkota][key]) {
              highest = this.dprd.table[element.properties.id_kabkota][key]
              highestkey = key
            }
          }
        })
        if(!this.paintData['fill-color'].includes(element.properties.id_kabkota)){
          if(party[highestkey]){
            this.paintData['fill-color'].push(element.properties.id_kabkota)
            this.paintData['fill-color'].push(party[highestkey].warna)
          }else{
            console.log('disini party',highestkey);
          }
        }
      })
      this.paintData['fill-color'].push('#0000ff')
      console.log(this.paintData)
    },
  },
  mounted() {
    this.getPartyData().then(() => {
      this.getGeoData().then(()=>{
        this.generatePaint()
        this.getMap()
        this.loading = false
      })
    })
    // this.generatePaint()
    // this.getMap()
  },
}
</script>
