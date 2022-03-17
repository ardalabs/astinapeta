<template>
  <div class="loading-page">
    <div class="absolute-center">
      <img
        height="100px"
        src="~/assets/img/digisiber.png"
        alt=""
        srcset=""
        class="mx-auto d-block"
      />
      <span> Loading... </span>
    </div>
  </div>
</template>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: white;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
