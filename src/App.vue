<script setup>
import { onMounted, provide, ref } from "vue";
import WeatherCity from "./components/WeatherCity.vue";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
import { motion } from "motion-v";
import animationShift from "./motion/animationShift";
import getCoordinateCity from "./hooks/getCoordinateCity";
import dataCity from "./data/dataCity";
import getLocationByIp from "./hooks/getLocationByIp";
import getWeatherCity from "./hooks/getWeatherCity";
import getCityByCoordinate from "./hooks/getCityByCoordinate";
import { useCityAndWeather } from "./store/useCityAndWeather";
const cityAndWeather = useCityAndWeather();
// const API_KEY = import.meta.env.VITE_API_KEY;
const city = ref("");
const weatherCity = ref("Kazan");
const weather = ref(cityAndWeather.newDataWeather[0]);
const currentItemWeather = ref(cityAndWeather.newDataWeather[0].list[0]);
const changeCurrentItemWeather = (value) => {
  currentItemWeather.value = value;
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
    const { latitude, longitude } = pos.coords;

    // const res = await fetch(
    // `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    // );
    //
    // setWeather(await res.json());
    const response = await getWeatherCity(latitude, longitude);
    const res = await getCityByCoordinate(latitude, longitude);
    setWeather(response);
    setCityName(res[0].name);
    cityAndWeather.addDataNewWeather(response);
    cityAndWeather.addDataCity(res);
    // console.log(latitude, longitude);
    // setWeather(dataNewWeather[2]);
    // console.log(getCoordinateCity(weatherCity).cityAndCountry.value.city);
    // const { cityAndCountry } = getCoordinateCity(weatherCity);
    // getCoordinateCity();
  } catch (error) {
    console.log(error);
  } finally {
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
  // console.log(latitude, longitude);
  const response = await getWeatherCity(latitude, longitude);
  const res = await getCityByCoordinate(latitude, longitude);
  // const { data } = await getCoordinateCity(res[0].name);
  setWeather(response);
  setCityName(res[0].name);
  cityAndWeather.addDataNewWeather(response);
  cityAndWeather.addDataCity(res);
  // console.log(cityAndWeather.newDataWeather);
  // this.weatherData = await this.getWeatherByCoords(latitude, longitude);
  // if (!this.weatherData) {
  // throw new Error("Can't load weather data from the ");
  // } else {
  // setWeatherData(this.weatherData);
  // }
}

async function getWeatherBySearch(cityValue) {
  const { latitude, longitude, data } = await getCoordinateCity(cityValue);
  const response = await getWeatherCity(latitude, longitude);
  setWeather(response);
  cityAndWeather.addDataNewWeather(response);
  cityAndWeather.addDataCity(data);
  setCityName(data[0].name);
  city.value = "";
  // console.log(response);
  // const { latitude, longitude } = await response.json();
  // console.log(data);
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
        @update:currentItemWeather="(e) => changeCurrentItemWeather(e)"
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
