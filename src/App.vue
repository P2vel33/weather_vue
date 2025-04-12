<script setup>
import { onMounted, provide, ref } from "vue";
import WeatherCity from "./components/WeatherCity.vue";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
import { motion } from "motion-v";
import animationShift from "./motion/animationShift";
import getCoordinateCity from "./hooks/getCoordinateCity";
import getLocationByIp from "./hooks/getLocationByIp";
import getWeatherCity from "./hooks/getWeatherCity";
import getCityByCoordinate from "./hooks/getCityByCoordinate";
import { useCityAndWeather } from "./store/useCityAndWeather";
const cityAndWeather = useCityAndWeather();
const city = ref("");
const weatherCity = ref("Kazan");
const weather = ref(cityAndWeather.newDataWeather[0]);
const currentItemWeather = ref(cityAndWeather.newDataWeather[0].list[0]);
const changeCurrentItemWeather = (value) => {
  currentItemWeather.value = value;
};

const setWeather = (value) => {
  weather.value = value;
  currentItemWeather.value = weather.value.list[0];
};
const setCityName = (value) => {
  weatherCity.value = value;
  console.log(weatherCity.value);
};

const setWeatherValues = (dataOfWeather, dataOfCity) => {
  setWeather(dataOfWeather);
  setCityName(dataOfCity[0].name);
  cityAndWeather.addDataNewWeather(dataOfWeather);
  cityAndWeather.addDataCity(dataOfCity);
};
provide("currentItem", { setWeather, setCityName });

async function success(pos) {
  try {
    const { latitude, longitude } = pos.coords;
    const response = await getWeatherCity(false, latitude, longitude);
    const res = await getCityByCoordinate(false, latitude, longitude);
    setWeatherValues(response, res);
  } catch (error) {
    console.log(error);
  }
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

  const { latitude, longitude } = await getLocationByIp();
  const response = await getWeatherCity(false, latitude, longitude);
  const res = await getCityByCoordinate(false, latitude, longitude);
  setWeatherValues(response, res);
}

async function getWeatherBySearch(cityValue) {
  const { latitude, longitude, data } = await getCoordinateCity(
    false,
    cityValue
  );
  const response = await getWeatherCity(false, latitude, longitude);
  setWeatherValues(response, data);
  city.value = "";
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
});
</script>

<template>
  <div class="home">
    <motion.div class="widget-list-and-header">
      <motion.h2 class="header-widget-list">Other cities</motion.h2>
      <div class="search">
        <img src="/public/searchIcon.svg" alt="" />
        <form @submit.prevent="getWeatherBySearch(city)">
          <input
            v-model="city"
            class="input-city"
            type="text"
            placeholder="Kazan"
          />
        </form>
      </div>
      <WidgetList
        :dataCity="cityAndWeather.dataCities"
        :dataNewWeather="cityAndWeather.newDataWeather"
      />
    </motion.div>
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
        :weather="weather"
        :weatherCity="weatherCity"
        :currentItemWeather="currentItemWeather"
        @update:currentItemWeather="(value) => changeCurrentItemWeather(value)"
      />
    </motion.div>
    <RightPanel :data="currentItemWeather" :weather />
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
  margin-left: 5%;
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
