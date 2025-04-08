<script setup>
import { ref } from "vue";
import WeatherWidgets from "./WeatherWidgets.vue";
import getCoordinateCity from "../hooks/getCoordinateCity";
import getWeatherCity from "../hooks/getWeatherCity";

const city = ref("орел");
const { cityAndCountry } = getCoordinateCity();
const { weather, iconId } = getWeatherCity();
</script>

<template>
  <div>
    <WeatherWidgets
      :weather="weather"
      :cityAndCountry="cityAndCountry"
      :iconId="iconId"
    />
  </div>
</template>

<style scoped></style>
