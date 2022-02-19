import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('mapgl', (geoJson,paintData) => {
    let xMax = 0;
    let yMax = 0;
    let xMin = 180;
    let yMin = 90;
    const getCorner = (geojson) => {
      console.log('gj',geojson);
      geojson.features.forEach(gj => {
        if(gj.geometry){
          if(gj.geometry.type==="Polygon"){
            gj.geometry.coordinates.forEach(gjc =>{
              gjc.forEach(gjcp => {
                if(gjcp[0]>xMax){
                  xMax=gjcp[0]
                }if(gjcp[1]>yMax){
                  yMax=gjcp[1]
                }if(gjcp[0]<xMin){
                  xMin=gjcp[0]
                }if(gjcp[1]<yMin){
                  yMin=gjcp[1]
                }
              })
            })
          }else{
            gj.geometry.coordinates.forEach(gjc =>{
              gjc.forEach(gjcp => {
                gjcp.forEach(gjcpp => {
                  if(gjcpp[0]>xMax){
                    xMax=gjcpp[0]
                  }if(gjcp[1]>yMax){
                    yMax=gjcpp[1]
                  }if(gjcpp[0]<xMin){
                    xMin=gjcpp[0]
                  }if(gjcpp[1]<yMin){
                    yMin=gjcpp[1]
                  }
                })
              })
            })
          }
        }
      });
      console.log(xMax,yMax);
      console.log(xMin,yMin);
    }
    getCorner(geoJson);
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZmFyaXozMTMiLCJhIjoiY2t6cDE4aXB5MjBxMDJvbnh6cTY5dHhzciJ9.mgc1iru7ABp6eaFTEfQQ_Q'
    // eslint-disable-next-line no-unused-vars
    const map = new mapboxgl.Map({
      container: 'map-conatiner',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [116.825264, -1.26916],
      zoom: 3,
    })
    map.on('load', () => {
      const layers = map.getStyle().layers
      let firstSymbolId
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          console.log(layer.type)
          firstSymbolId = layer.id
          break
        }
      }

      console.log(geoJson)
      map.addSource('area-geo', {
        type: 'geojson',
        data: geoJson,
      })

      map.addLayer(
        {
          id: 'area-boundary',
          type: 'fill',
          source: 'area-geo',
          paint: paintData,
          filter: ['==', '$type', 'Polygon'],
        },
        firstSymbolId
      )
      map.addLayer(
        {
          id: 'route',
          type: 'line',
          source: 'area-geo',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#000000',
            'line-width': 1.5,
            'line-opacity': 0.5,
          },
        },
        firstSymbolId
      )

      const coordinates = [
        [xMin,yMax],
        [xMax, yMin],
      ]
      // Create a 'LngLatBounds' with both corners at the first coordinate.
      const bounds = new mapboxgl.LngLatBounds(coordinates)

      // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
      for (const coord of coordinates) {
        bounds.extend(coord)
      }

      map.fitBounds(bounds)
    })
    return map;
  })
}