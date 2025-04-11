<script setup>
import { onMounted, provide, ref } from "vue";
import WeatherCity from "./components/WeatherCity.vue";
import dataNewWeather from "./data/dataNewWeather";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
import { animate, motion } from "motion-v";
import animationShift from "./motion/animationShift";
import getCoordinateCity from "./hooks/getCoordinateCity";

const API_KEY = import.meta.env.VITE_API_KEY;
const city = ref("");
const weatherCity = ref("");
const weather = ref(dataNewWeather[0]);
const currentItemWeather = ref(dataNewWeather[0].list[0]);
const changeCurrentItemWeather = (value) => {
  currentItemWeather.value = value;
};
const getNameCity = (object) => {
  console.log(object);
};

// const changeCurrentItem = (value) => {
// console.log(value.list[0].main.temp - -273, 15);
// currentItem.value = value;
// setWeather(value);
// weather.value = value;
// currentItemWeather.value = value.list[0];
// console.log(currentItem.value.list[0].main.temp - 273, 15);
// };

// const getLatAndLon = async () => {
// const responseLon = await fetch("https://ipapi.co/longitude");
// const responseLat = await fetch("https://ipapi.co/latitude");
// lon.value = await responseLon.json();
// lat.value = await responseLat.json();
// console.log(lat.value, lon.value);
// };

// getLatAndLon();

const setWeather = (value) => {
  weather.value = value;
  currentItemWeather.value = weather.value.list[0];
};
const setCityName = (value) => {
  weatherCity.value = value;
  console.log(weatherCity.value);
};
provide("currentItem", { setWeather, setCityName });
async function success(pos) {
  try {
    // const { latitude, longitude } = pos.coords;
    // const res = await fetch(
    // `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    // );
    //
    // setWeather(await res.json());
    setWeather(dataNewWeather[2]);
    console.log(getCoordinateCity().cityAndCountry.value);
  } catch (error) {
    console.log(error);
  } finally {
    // console.log(latitude, longitude);
    console.log(weather.value);
  }
  // console.log(response);

  // console.log(pos);
  // console.log(new Date(pos.timestamp));
  // console.log(new Date());

  // const weather = await this.getWeatherByCoords(latitude, longitude);
  // if (!weather) {
  // this.errorMessage = "Can't load weather data from ";
  // this.loading = false;
  // } else {
  // this.loading = false;
  // this.setWeatherData(weather);
  // }
  // console.log(latitude, longitude);
}
async function error(err) {
  if (err.code === 1) {
    console.log("Not enough permissions");
  } else if (err.code === 2) {
    console.log("Position unavailable");
  } else if (err.code === 3) {
    console.log("Timeout exceeded");
  } else {
    console.log("Unknown error");
  }
  // const { latitude, longitude } = await this.getLocationByIp();
  // this.weatherData = await this.getWeatherByCoords(latitude, longitude);
  // if (!this.weatherData) {
  // throw new Error("Can't load weather data from the ");
  // } else {
  // setWeatherData(this.weatherData);
  // }
}
// console.log(time.now());

onMounted(() => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    // timeout: 5000,
    maximumAge: 0,
  });
});
</script>

<template>
  <div class="home">
    <motion.div
      class="left-panel"
      initial="hidden"
      animate="show"
      :variants="animationShift('beforeChildren', 1, 0, -100).container"
    >
      <WeatherCity
        initial="hidden"
        animate="show"
        :variants="animationShift('beforeChildren', 1, -200, 0).item"
        :weather="weather"
        :weatherCity
        :currentItemWeather="currentItemWeather"
        @update:currentItemWeather="(e) => changeCurrentItemWeather(e)"
      />
    </motion.div>
    <motion.div class="widget-list-and-header">
      <motion.h2 class="header-widget-list">Others cities</motion.h2>
      <div class="search">
        <img src="/public/searchIcon.svg" alt="" />
        <form @submit.prevent="(e) => getNameCity(e.target.value)">
          <input
            v-model="city"
            class="input-city"
            type="text"
            placeholder="Kazan"
          />
        </form>
      </div>
      <WidgetList />
    </motion.div>
    <RightPanel :data="currentItemWeather" />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

* {
  margin: 0%;
}
.input-city {
  margin-left: 2%;
  background: none;
  border: none;
  color: rgba(235, 235, 245, 0.6);

  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.41px;
  text-align: left;
  width: 90%;
}

.input-city:focus {
  border: none;
  background: none;
  color: white;
  outline: none;
}

.search {
  display: flex;
  flex-direction: row;
  border-radius: 10px;

  box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: linear-gradient(
    136.55deg,
    rgba(46, 51, 90, 0.26) 2.552%,
    rgba(28, 27, 51, 0.26) 93.363%
  );
  padding: 1%;
}

.widget-list-and-header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  justify-content: center;
}
.header-widget-list {
  /* Default / Bold / LargeTitle */
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: center;
}
.home {
  padding-bottom: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 5%;

  box-shadow: inset 0px 1px 0px 0px rgb(255, 255, 255),
    0px 20px 100px 0px rgba(74, 57, 127, 0.7);
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(69, 39, 139, 0.9),
    rgba(46, 51, 90, 0.9) 100%
  );
}
</style>
