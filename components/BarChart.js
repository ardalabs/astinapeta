import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options','plugins'],
  mounted () {
    this.renderChart(this.data, this.plugins, this.options)
  }
}