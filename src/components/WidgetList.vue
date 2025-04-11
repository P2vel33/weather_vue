<script setup>
import dataCity from "../data/dataCity";
import dataNewWeather from "../data/dataNewWeather";
import dataWeather from "../data/dataWeather";
import WeatherWidgets from "./WeatherWidgets.vue";
// dataNewWeather
// dataWeather
// const dC = dataCity[0];
// const dW = dataWeather[0];
</script>

<template>
  <div class="widget-list">
    <WeatherWidgets
      v-for="(item, index) of dataCity"
      :key="index"
      :dataCity="dataCity[index]"
      :dataWeather="dataWeather[index]"
    />
  </div>
</template>

<style scoped>
.widget-list {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* Weather Color/Linear/1 */
  /* Weather Color/Linear/1 */
}
</style>
