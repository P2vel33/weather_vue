<script setup>
import { motion } from "motion-v";
import WeatherWidgets from "./WeatherWidgets.vue";
import animationShift from "../motion/animationShift";
import { useCityAndWeather } from "../store/useCityAndWeather";
const cityAndWeather = useCityAndWeather();
</script>

<template>
  <motion.div
    class="widget-list"
    initial="hidden"
    animate="show"
    :variants="animationShift('beforeChildren', 1, 0, -100).container"
  >
    <WeatherWidgets
      initial="hidden"
      animate="show"
      v-for="(item, index) of cityAndWeather.newDataWeather"
      :variants="animationShift('beforeChildren', 1, 0, -300 * index).item"
      :key="index"
      :dataCity="cityAndWeather.dataCities[index]"
      :dataNewWeather="cityAndWeather.newDataWeather[index]"
    />
  </motion.div>
</template>

<style scoped>
.widget-list {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 800px;
  overflow-y: auto;
}

.widget-list::-webkit-scrollbar {
  width: auto;
}

.widget-list::-webkit-scrollbar-track {
  background: none; /* цвет зоны отслеживания */
}

.widget-list::-webkit-scrollbar-thumb {
  background-color: rgb(28, 27, 51) 95.915%; /* цвет бегунка */
  border-radius: 20px; /* округлось бегунка */
  border: 1px solid rgba(255, 255, 255, 0.9);
}
</style>
