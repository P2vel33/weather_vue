<script setup>
import { motion } from "motion-v";
import animationShift from "../motion/animationShift";
import WeatherCity from "./WeatherCity.vue";
</script>

<template>
  <motion.div
    class="center-panel"
    initial="hidden"
    animate="show"
    :variants="animationShift('beforeChildren', 1, 0, -100).container"
  >
    <WeatherCity
      initial="hidden"
      animate="show"
      :variants="animationShift('beforeChildren', 1, -200, 0).item"
    />
  </motion.div>
</template>

<style lang="scss" scoped></style>
