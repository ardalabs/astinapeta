import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['data', 'options', 'handler'],
  mounted () {
    this.renderChart(this.data, this.options )
  },
  watch: {
    handler() {
      this.renderChart(this.data, this.options );
    }
  }
}