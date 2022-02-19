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
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
            // backgroundColor: ["red", "orange", "yellow"],
            backgroundColor: [
            ],
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
      party: [
        {
          warna: '#00FF00',
          is_aceh: false,
          id_pilihan: 1,
          nomor_urut: 1,
          nama: 'PKB',
          nama_lengkap: 'PKB',
        },
        {
          warna: '#FF0000',
          is_aceh: false,
          id_pilihan: 2,
          nomor_urut: 2,
          nama: 'Gerindra',
          nama_lengkap: 'Gerindra',
        },
        {
          warna: '#CD0000',
          is_aceh: false,
          id_pilihan: 3,
          nomor_urut: 3,
          nama: 'PDIP',
          nama_lengkap: 'PDIP',
        },
        {
          warna: '#FFFF00',
          is_aceh: false,
          id_pilihan: 4,
          nomor_urut: 4,
          nama: 'Golkar',
          nama_lengkap: 'Golkar',
        },
        {
          warna: '#27408B',
          is_aceh: false,
          id_pilihan: 5,
          nomor_urut: 5,
          nama: 'NasDem',
          nama_lengkap: 'NasDem',
        },
        {
          warna: '#B42327',
          is_aceh: false,
          id_pilihan: 6,
          nomor_urut: 6,
          nama: 'Garuda',
          nama_lengkap: 'Garuda',
        },
        {
          warna: '#FCFC00',
          is_aceh: false,
          id_pilihan: 7,
          nomor_urut: 7,
          nama: 'Berkarya',
          nama_lengkap: 'Berkarya',
        },
        {
          warna: '#000000',
          is_aceh: false,
          id_pilihan: 8,
          nomor_urut: 8,
          nama: 'PKS',
          nama_lengkap: 'PKS',
        },
        {
          warna: '#2B2D8C',
          is_aceh: false,
          id_pilihan: 9,
          nomor_urut: 9,
          nama: 'Perindo',
          nama_lengkap: 'Perindo',
        },
        {
          warna: '#008000',
          is_aceh: false,
          id_pilihan: 10,
          nomor_urut: 10,
          nama: 'PPP',
          nama_lengkap: 'PPP',
        },
        {
          warna: '#E71B25',
          is_aceh: false,
          id_pilihan: 11,
          nomor_urut: 11,
          nama: 'PSI',
          nama_lengkap: 'PSI',
        },
        {
          warna: '#0000FF',
          is_aceh: false,
          id_pilihan: 12,
          nomor_urut: 12,
          nama: 'PAN',
          nama_lengkap: 'PAN',
        },
        {
          warna: '#FFCC29',
          is_aceh: false,
          id_pilihan: 13,
          nomor_urut: 13,
          nama: 'Hanura',
          nama_lengkap: 'Hanura',
        },
        {
          warna: '#191970',
          is_aceh: false,
          id_pilihan: 14,
          nomor_urut: 14,
          nama: 'Demokrat',
          nama_lengkap: 'Demokrat',
        },
        {
          warna: '#000000',
          is_aceh: true,
          id_pilihan: 15,
          nomor_urut: 15,
          nama: 'PA',
          nama_lengkap: 'PA',
        },
        {
          warna: '#000000',
          is_aceh: true,
          id_pilihan: 16,
          nomor_urut: 16,
          nama: 'Partai SIRA',
          nama_lengkap: 'Partai SIRA',
        },
        {
          warna: '#000000',
          is_aceh: true,
          id_pilihan: 17,
          nomor_urut: 17,
          nama: 'PD Aceh',
          nama_lengkap: 'PD Aceh',
        },
        {
          warna: '#000000',
          is_aceh: true,
          id_pilihan: 18,
          nomor_urut: 18,
          nama: 'PNA',
          nama_lengkap: 'PNA',
        },
        {
          warna: '#00623D',
          is_aceh: false,
          id_pilihan: 19,
          nomor_urut: 19,
          nama: 'PBB',
          nama_lengkap: 'PBB',
        },
        {
          warna: '#F71900',
          is_aceh: false,
          id_pilihan: 20,
          nomor_urut: 20,
          nama: 'PKPI',
          nama_lengkap: 'PKPI',
        },
      ],
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
  mounted() {
    this.barChartData.datasets[0].backgroundColor = []
    this.barChartData.labels = []
    this.barChartData.datasets[0].data = []
    this.party.forEach((element)=>{
      this.barChartData.labels.push(element.nama)
      this.barChartData.datasets[0].backgroundColor.push(element.warna)
      this.barChartData.datasets[0].data = this.dataChart;
      console.log('bar',this.barChartData.data);
    })
    this.dataReady=true
  },
}
</script>
<style>
.chartStyle {
  height: '1500px';
}
</style>
