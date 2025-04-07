<script setup>
import { ref } from "vue";
import WeatherWidgets from "./components/WeatherWidgets.vue";
import WeatherCity from "./components/WeatherCity.vue";
const isVisiable = ref(true);
</script>

<template>
  <!-- <div class="wheather">
    <WeatherWidgets />
    <WeatherWidgets />
    <WeatherWidgets />
    <WeatherWidgets />
  </div> -->
  <div class="home">
    <!-- <img src="/public/BackgroundHome.svg" alt="" :width="'1920px'" /> -->
    <div class="wheather" v-if="isVisiable">
      <!-- <WeatherWidgets />
      <WeatherWidgets />
      <WeatherWidgets />
      <WeatherWidgets /> -->
      <WeatherCity />
    </div>
    <div class="home-content" v-else></div>
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
  /* background-image: url("/public/BackgroundHome.svg"); */
  /* background-repeat: no-repeat; */
  /* width: 390px; */
  /* height: 844px; */
  /* width: 100%; */
  /* height: 100vh; */
}

.home {
  /* width: 390px; */
  /* height: 844px; */
  padding: 10%;
  /* border-radius: 44px; */
  box-shadow: 40px 60px 150px 0px rgba(59, 38, 123, 0.7);

  background: linear-gradient(
    136.55deg,
    rgb(46, 51, 90) 1.538%,
    rgb(28, 27, 51) 95.915%
  );
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* width: 100%; */
  /* height: 100vh; */
  /* background-image: url("/public/BackgroundHome.svg"); */
  /* background-color: aqua; */
  /* background-image: url("/public/Back.jpg"); */
  /* background-size: 100% 100%; */
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

.home-content {
  background-image: url("/public/House.svg");
  width: 500px;
  height: 500px;
  background-repeat: no-repeat;
}
</style>
