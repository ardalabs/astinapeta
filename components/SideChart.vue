<template>
  <div class="legend pb-3">
    <div class="container-fluid h-100 px-0">
      <div class="card h-100 bg-light" style="border-radius: 20px">
        <div>
          <h5 class="w-100 text-center">
            {{ wilayah }}
          </h5>
        </div>
        <div>
          <BarChart
            v-if="dataReady"
            class="chartStyle"
            :data="barChartData"
            :options="barChartOptions"
            :handler="handler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { party } from '../pages/party'
import BarChart from '~/components/BarChart'
// const chartColors = {
//   red: 'rgb(255, 99, 132)',
//   orange: 'rgb(255, 159, 64)',
//   yellow: 'rgb(255, 205, 86)',
//   green: 'rgb(75, 192, 192)',
//   blue: 'rgb(54, 162, 235)',
//   purple: 'rgb(153, 102, 255)',
//   grey: 'rgb(201, 203, 207)',
// }
export default {
  props: {
    data: {},
    wilayah: String,
    dataChart: [],
  },
  data() {
    return {
      handler: false,
      images: [
        'https://i.stack.imgur.com/2RAv2.png',
        'https://i.stack.imgur.com/Tq5DA.png',
        'https://i.stack.imgur.com/3KRtW.png',
        'https://i.stack.imgur.com/iLyVi.png',
      ],
      barChartData: {
        labels: [],
        datasets: [
          {
            label: 'Perloehan Suara',
            backgroundColor: [],
            data: [],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        title: {
          display: true,
          text: 'Perolehan Suara',
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      dataReady: false,
    }
  },
  components: {
    BarChart,
  },
  methods: {
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    getData() {
      this.dataReady = false
      this.barChartData.datasets[0].backgroundColor = []
      this.barChartData.labels = []
      this.barChartData.datasets[0].data = []
      Object.keys(party).forEach((key) => {
        this.barChartData.labels.push(party[key].nama)
        this.barChartData.datasets[0].backgroundColor.push(party[key].warna)
        this.barChartData.datasets[0].data = this.dataChart
      })
      this.barChartData.datasets[0].backgroundColor.splice(14,4)
      this.barChartData.labels.splice(14,4)
      this.barChartData.datasets[0].data.splice(14,4)
      this.dataReady = true
    },
  },
  mounted() {
    this.getData()
  },
  watch: {
    wilayah() {
      this.getData()
      this.handler = !this.handler
    }
  }
}
</script>
<style>
.chartStyle {
  height: '1500px';
}
</style>
