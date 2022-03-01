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
// import { party } from '../../../../../party'
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
      left: true,
    }
  },
  methods: {
    async getGeoData() {
      await this.$axios
        .get(
          '/geo/village/' +
            this.$route.params.nmkabkota +
            '/' +
            this.$route.params.nmkecamatan
        )
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
      this.$mapgl(this.geoJson, this.paintData)
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    generatePaint() {
      this.paintData = {
        'fill-color': '#0000ff',
        'fill-opacity': 1,
      }
    },
  },
  mounted() {
    if (this.$route.params.idprovince === '1') {
      this.isAceh = true
    }
    this.getGeoData().then(() => {
      this.generatePaint()
      this.getMap()
      this.loading = false
    })
    // this.generatePaint()
    // this.getMap()
  },
}
</script>
