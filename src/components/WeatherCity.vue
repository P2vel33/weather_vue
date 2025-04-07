<script setup>
import { ref } from "vue";
import WeatherWidgets from "./WeatherWidgets.vue";
const city = ref("Казань");
const api_key = import.meta.env.VITE_API_KEY;
const weather = ref({});
const iconId = ref(0);
const cityAndCountry = ref({});

const getCoordinateCity = async () => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`
    );
    const response = await res.json();
    const { lat, lon } = response[0];
    cityAndCountry.value = {
      city: response[0].name,
      country: response[0].country,
    };
    console.log(cityAndCountry.value);
    return { lat, lon };
  } catch (error) {
    console.log(error);
  }
};

const getWeatherCity = async () => {
  try {
    const { lat, lon } = await getCoordinateCity();
    // console.log(lat, lon);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    );
    const response = await res.json();
    // console.log(response);
    weather.value = response.main;
    iconId.value = response.weather[0].id;
    // console.log(Number(data.value.main.temp - 273.15).toFixed());
    // console.log(data.value.main.temp);
  } catch (error) {
    console.log(error);
  }
};

// console.log(data.value);

getWeatherCity();
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
