<template>
  <div>
    <div style="height: 100vh" id="map-conatiner"></div>
    <SideChart
      v-if="hover"
      :wilayah="prov"
      :dataChart="dataChart"
      :isAceh="isAceh"
      :left="left"
    />
    <Loading v-if="loading" />
    <img
      class="top-right"
      height="100px"
      src="~/assets/img/logo.png"
      alt=""
      srcset=""
    />
    <nuxt-link class="top-left" to="/">
      <img height="100%" src="~/assets/img/back.png" alt="" srcset="" />
    </nuxt-link>
  </div>
</template>

<script>
import { party } from '../../../../party'
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
      dataChart: [],
      loading: true,
      isAceh: false,
      left: true
    }
  },
  methods: {
    async getGeoData() {
      await this.$axios
        .get('/geo/featuredmap/' + this.$route.params.idregency + '/2')
        .then((res) => {
          this.geoJson = res.data.data
        })
    },
    async getPartyData() {
      await this.$axios
        .get(
          '/geo/result/dprdpkab/' +
            this.$route.params.idprovince +
            '/' +
            this.$route.params.idregency
        )
        .then((res) => {
          this.dprd = res.data.data
        })
    },
    getMap() {
      const map = this.$mapgl(this.geoJson, this.paintData)
      map.on('click', 'area-boundary', (e) => {
        this.$router.push(
          '/regencies/' +
            this.$route.params.idprovince +
            '/districts/' +
            e.features[0].properties.id_kecamatan+
            '/villages/'+
            e.features[0].properties.nm_kabkota+'/'+
            e.features[0].properties.nm_kecamatan
        )
      })
      map.on('mousemove', 'area-boundary', (e) => {
        if (this.prov !== e.features[0].properties.id_kecamatan) {
          this.hover = false
        }
        if(window.event.screenX<(window.screen.width/2)-0.05*window.screen.width){
          this.left=false
        }if(window.event.screenX>(window.screen.width/2)+0.05*window.screen.width){
          this.left=true
        }
        this.prov = e.features[0].properties.nm_kecamatan
        this.dataChart = []
        if (this.dprd.table[e.features[0].properties.id_kecamatan]) {
          for (let index = 0; index < 20; index++) {
            if (
              this.dprd.table[e.features[0].properties.id_kecamatan][index + 1]
            ) {
              this.dataChart.push(
                this.dprd.table[e.features[0].properties.id_kecamatan][
                  index + 1
                ]
              )
            } else {
              this.dataChart.push(0)
            }
          }
        }

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
        'fill-color': ['match', ['get', 'id_kecamatan']],
        'fill-opacity': 1,
      }
      console.log(this.geoJson.features)
      this.geoJson.features.forEach((element) => {
        let highest = 0
        let highestkey = ''
        Object.keys(this.dprd.table[element.properties.id_kecamatan]).forEach(
          (key) => {
            if (key !== 'persen') {
              if (
                highest < this.dprd.table[element.properties.id_kecamatan][key]
              ) {
                highest = this.dprd.table[element.properties.id_kecamatan][key]
                highestkey = key
              }
            }
          }
        )
        if (
          !this.paintData['fill-color'].includes(
            element.properties.id_kecamatan
          )
        ) {
          if (party[highestkey]) {
            this.paintData['fill-color'].push(element.properties.id_kecamatan)
            this.paintData['fill-color'].push(party[highestkey].warna)
          } else {
            console.log('disini party', highestkey)
          }
        }
      })
      this.paintData['fill-color'].push('#0000ff')
      console.log(this.paintData)
    },
  },
  mounted() {
    if (this.$route.params.idprovince === '1') {
      this.isAceh = true
    }
    this.getPartyData().then(() => {
      this.getGeoData().then(() => {
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
