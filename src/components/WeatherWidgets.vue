<script setup>
const width = window.innerWidth;
const height = window.innerHeight;
</script>

<template>
  <div class="div">
    <div class="rectangle">
      <!-- <img src="/public/Subtract.svg" class="rectangle" /> -->
      <p class="label1">19°</p>
      <div class="image"></div>
      <div class="label2">
        <p class="label21">H:24° L:18°</p>
        <p class="label22">Montreal, Canada</p>
      </div>
      <p class="label3">Partly Cloudy</p>
    </div>
  </div>
</template>

<style scoped>
.div {
  position: relative;
  width: 100%;
  height: 800px;
  left: 20px;
  align-items: center;
}
.rectangle {
  position: absolute;
  background-image: url("/public/Subtract.svg");
  /* background-position: 90%; */
  background-size: 99% 90%;
  width: 99.1%;
  height: 700px;
  background-repeat: no-repeat;
  top: 11px;
  bottom: 1px;
  display: flex;
  justify-content: center;
}
.label1 {
  position: absolute;
  width: 27.7%;
  height: 22.2%;
  left: 5.8%;
  top: 27.5%;
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 11.3vw;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: left;
}
.label2 {
  position: absolute;
  width: 39.7%;
  height: 22.3%;
  left: 5.8%;
  top: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0px;
  margin: 0;
}

.label3 {
  position: absolute;
  width: 24%;
  height: 9.7%;
  left: 69.2%;
  top: 78.1%;
  color: rgb(255, 255, 255);
  font-family: SF Pro Text;
  font-size: 2.71vw;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.08px;
}
.label21 {
  color: rgba(235, 235, 245, 0.6);
  height: 100%;
  text-align: left;
  vertical-align: text-top;
  font-size: 2.71vw;
}

.label22 {
  color: white;
  height: 100%;
  text-align: left;
  font-size: 3.55vw;
}
.image {
  position: absolute;
  width: 46.7%;
  height: 86.9%;
  left: 52%;
  top: -30px;
  background-image: url("/public/MoonCloudFastWind.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
