<script setup>
import { motion } from "motion-v";
import WeatherWidgets from "./WeatherWidgets.vue";
import animationShift from "../motion/animationShift";

const { dataCity, dataNewWeather } = defineProps({
  dataCity: {
    type: Object,
    required: true,
  },
  dataNewWeather: {
    type: Object,
    required: true,
  },
});
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
      v-for="(item, index) of dataNewWeather"
      :variants="animationShift('beforeChildren', 1, 0, -300 * index).item"
      :key="index"
      :dataCity="dataCity[index]"
      :dataNewWeather="dataNewWeather[index]"
    />
  </motion.div>
</template>

<style scoped>
.widget-list {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
