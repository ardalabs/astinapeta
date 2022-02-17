import Vue from 'vue'
import { Bar } from "vue-chartjs";

Vue.component('BarChart', Bar.extend({
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
}));