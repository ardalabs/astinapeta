<template>
  <div>
    <div style="height:100vh" id="map-conatiner">
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZmFyaXozMTMiLCJhIjoiY2t6cDE4aXB5MjBxMDJvbnh6cTY5dHhzciJ9.mgc1iru7ABp6eaFTEfQQ_Q'
    // eslint-disable-next-line no-unused-vars
    const map = new mapboxgl.Map({
      container: 'map-conatiner',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [106.816666, -6.200000],
      zoom:4,
    })
  },
}
</script>
