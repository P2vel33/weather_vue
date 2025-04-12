<script setup>
import { onMounted, ref } from "vue";
import WeatherCity from "./components/WeatherCity.vue";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
import { motion } from "motion-v";
import animationShift from "./motion/animationShift";
import getCoordinateCity from "./hooks/async/getCoordinateCity";
import getLocationByIp from "./hooks/async/getLocationByIp";
import getWeatherCity from "./hooks/async/getWeatherCity";
import getCityByCoordinate from "./hooks/async/getCityByCoordinate";
import { useCityAndWeather } from "./store/useCityAndWeather";
import LeftPanel from "./components/LeftPanel.vue";
import CentralPanel from "./components/CentralPanel.vue";
import Loading from "./components/UI/Loading.vue";

const cityAndWeather = useCityAndWeather();

async function success(pos) {
  try {
    cityAndWeather.setLoading();
    const { latitude, longitude } = pos.coords;
    const response = await getWeatherCity(true, latitude, longitude);
    const res = await getCityByCoordinate(true, latitude, longitude);
    cityAndWeather.setWeatherValues(response, res);
  } catch (error) {
    cityAndWeather.removeLoading();
    console.log(error);
  } finally {
    cityAndWeather.removeLoading();
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
  try {
    cityAndWeather.setLoading();
    const { latitude, longitude } = await getLocationByIp();
    const response = await getWeatherCity(true, latitude, longitude);
    const res = await getCityByCoordinate(true, latitude, longitude);
    cityAndWeather.setWeatherValues(response, res);
  } catch (error) {
    console.log(error);
    cityAndWeather.removeLoading();
  } finally {
    cityAndWeather.removeLoading();
  }
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
  <div class="backs">
    <Loading v-if="cityAndWeather.isLoading" />
    <div v-else class="home">
      <LeftPanel />
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
      <!-- <CentralPanel /> -->
      <RightPanel
        :data="cityAndWeather.currentItemWeather"
        :weather="cityAndWeather.weather"
      />
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

* {
  margin: 0%;
}

.home {
  max-width: 2000px;
  height: min-content;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 10%;
  padding-top: 1%;
  display: flex;
  flex: none;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 5%;
}

.backs {
  box-shadow: inset 0px 1px 0px 0px rgb(255, 255, 255),
    0px 20px 100px 0px rgba(74, 57, 127, 0.7);
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(69, 39, 139, 0.9),
    rgba(46, 51, 90, 0.9) 100%
  );
  width: auto;
  min-height: 100vh;
  /* align-items: center; */
  /* justify-items: center; */
}
</style>
