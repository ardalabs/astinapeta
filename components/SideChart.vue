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
            class="chartStyle"
            :data="barChartData"
            :options="barChartOptions"
          />
        </div>
        <!-- <div class="d-flex justify-content-around">
          <div class="card bg-white p-1">
            <div class="card-body">
              <img
                style="height: 25px; width: auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Partai_NasDem.svg/640px-Partai_NasDem.svg.png"
              />
              <strong>{{ getRndInteger(10, 50) }}%</strong>
              ({{ getRndInteger(10, 100) }})
            </div>
          </div>
          <div class="card bg-white p-1">
            <div class="card-body">
              <img
                style="height: 25px; width: auto"
                src="https://awsimages.detik.net.id/community/media/visual/2019/04/15/0ed3f774-4eb9-4275-b7f2-9b514f9676e9_11.jpeg?w=1200"
              />
              <strong>{{ getRndInteger(10, 50) }}%</strong>
              ({{ getRndInteger(10, 100) }})
            </div>
          </div>
          <div class="card bg-white p-1">
            <div class="card-body">
              <img
                style="height: 25px; width: auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Logo_of_the_Democratic_Party_%28Indonesia%29.svg/1200px-Logo_of_the_Democratic_Party_%28Indonesia%29.svg.png"
              />
              <strong>{{ getRndInteger(10, 50) }}%</strong>
              ({{ getRndInteger(10, 100) }})
            </div>
          </div>
          <div class="card bg-white p-1">
            <div class="card-body">
              <img
                style="height: 25px; width: auto"
                src="https://kilasjatim.com/wp-content/uploads/2019/01/Screenshot_2019-01-31-11-15-11-814_com.android.chrome.jpg"
              />
              <strong>{{ getRndInteger(10, 50) }}%</strong>
              ({{ getRndInteger(10, 100) }})
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from '~/components/BarChart'
const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}
export default {
  props: {
    data: {},
    wilayah: String,
  },
  data() {
    return {
      images: [
        'https://i.stack.imgur.com/2RAv2.png',
        'https://i.stack.imgur.com/Tq5DA.png',
        'https://i.stack.imgur.com/3KRtW.png',
        'https://i.stack.imgur.com/iLyVi.png',
      ],
      barChartData: {
        labels: [
          'NASDEM',
          'GOLKAR',
          'PDI',
          'GERINDRA',
          'DEMOKRAT',
          'PAN',
          'PKB',
          'PKS',
          'HANURA',
          'PPP',
        ],
        datasets: [
          {
            label: 'Perloehan Suara',
            // backgroundColor: ["red", "orange", "yellow"],
            backgroundColor: [
              chartColors.blue,
              chartColors.yellow,
              chartColors.red,
              chartColors.red,
              chartColors.blue,
              chartColors.blue,
              chartColors.green,
              chartColors.orange,
              chartColors.yellow,
              chartColors.green,
            ],
            data: [
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
              this.getRndInteger(0, 100),
            ],
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
    }
  },
  components: {
    BarChart,
  },
  methods: {
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
}
</script>
<style>
.chartStyle {
  height: '1500px';
}
</style>
