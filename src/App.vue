<script setup>
import { ref } from "vue";
import WeatherWidgets from "./components/WeatherWidgets.vue";
import WeatherCity from "./components/WeatherCity.vue";
import dataNewWeather from "./data/dataNewWeather";
import WeatherHoursOrDays from "./components/WeatherHoursOrDays.vue";
const isVisiable = ref(false);
</script>

<template>
  <div class="home">
    <div class="left-panel">
      <WeatherCity />
    </div>
    <div class="wheather" v-if="isVisiable"></div>
    <div class="home-content" v-else></div>
  </div>
</template>

<style>
* {
  margin: 0%;
}

.div {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 50px;
}

.home {
  padding: 10%;
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
</style>
