<script setup>
import { motion } from "motion-v";
import { ref } from "vue";
import getCoordinateCity from "../hooks/async/getCoordinateCity";
import WidgetList from "./WidgetList.vue";
import { useCityAndWeather } from "../store/useCityAndWeather";
import getWeatherCity from "../hooks/async/getWeatherCity";
import { useLoadingStore } from "../store/useLoadingStore";
import Loading from "./UI/Loading.vue";
const cityAndWeather = useCityAndWeather();
const loadingStore = useLoadingStore();

const city = ref("");

async function getWeatherBySearch(cityValue) {
  try {
    loadingStore.setLoadingWeatherWidgets();
    const { data, latitude, longitude } = await getCoordinateCity(
      false,
      cityValue
    );
    const response = await getWeatherCity(false, latitude, longitude);
    cityAndWeather.setWeatherValues(response, data);
  } catch (error) {
    console.log(error);
  } finally {
    city.value = "";
    loadingStore.removeLoadingWeatherWidgets();
  }
}
</script>

<template>
  <motion.div class="widget-list-and-header">
    <motion.h2 class="header-widget-list">Other cities</motion.h2>
    <div class="search">
      <img src="/public/searchIcon.svg" alt="" />
      <form @submit.prevent="getWeatherBySearch(city)">
        <input
          v-model="city"
          class="input-city"
          type="text"
          placeholder="City name"
        />
      </form>
    </div>
    <Loading v-if="loadingStore.isLoadingWeatherWidgets" />
    <WidgetList v-else />
  </motion.div>
</template>

<style scoped>
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
  min-width: 352px;
  min-height: 880px;
  max-height: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: flex-start;
  gap: 10px;
  /* justify-content: center; */
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
</style>
