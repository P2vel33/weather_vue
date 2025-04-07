<script setup>
import WeatherWidgets from "./components/WeatherWidgets.vue";
</script>

<template>
  <div class="wheather">
    <WeatherWidgets />
    <WeatherWidgets />
    <WeatherWidgets />
    <WeatherWidgets />
  </div>

  <!-- <div class="div">
    <div class="rectangle">
      <p class="label1">19°</p>
      <div class="image"></div>
      <div class="label2">
        <p class="label21">H:24° L:18°</p>
        <p class="label22">Montreal, Canada</p>
      </div>
      <p class="label3">Partly Cloudy</p>
    </div>
  </div> -->
</template>

<style>
* {
  margin: 0%;
}
.wheather {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-radius: 44px;
  box-shadow: 40px 60px 150px 0px rgba(59, 38, 123, 0.7);
  background: linear-gradient(
    136.55deg,
    rgb(46, 51, 90) 1.538%,
    rgb(28, 27, 51) 95.915%
  );
  padding: 10%;
}
/* .div {
  position: relative;
  width: 342px;
  height: 184px;
  left: 20px;
}
.rectangle {
  position: absolute;
  background-image: url("/public/Subtract.svg");
  width: 339px;
  height: 167px;
  background-repeat: no-repeat;
  top: 11px;
  bottom: 1px;
}
.label1 {
  position: absolute;
  left: 20px;
  top: 48px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 64px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: left;
}
.label2 {
  position: absolute;

  width: 136px;
  height: 41px;
  left: 20px;
  top: 113px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin: 0;
}
.label3 {
  position: absolute;
  width: 81px;
  height: 18px;
  left: 237px;
  top: 136px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Text;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.08px;
}
.label21 {
  color: rgba(235, 235, 245, 0.6);
}

.label22 {
  color: white;
}
.image {
  position: absolute;
  width: 160px;
  height: 160px;
  left: 175px;
  top: -30px;
  background: url("/public/MoonCloudFastWind.svg");
} */
</style>
