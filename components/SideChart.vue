<template>
  <div class="legend pb-3">
    <div class="container-fluid h-100 px-0">
      <div class="card h-100 bg-light p-3 px-5">
        <div>
          <h5 class="w-100 text-center">
            {{ wilayah }}
          </h5>
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
export default {
  props: {
    data: Object,
    wilayah: String,
  },

  methods: {
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
}
</script>
