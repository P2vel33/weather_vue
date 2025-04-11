<script setup>
import { onMounted, ref } from "vue";
import WeatherCity from "./components/WeatherCity.vue";
import dataNewWeather from "./data/dataNewWeather";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";

const API_KEY = import.meta.env.VITE_API_KEY;
const city = ref("");
const weather = ref(dataNewWeather[0]);
const currentItemWeather = ref(dataNewWeather[0].list[0]);
const changeCurrentItemWeather = (value) => {
  currentItemWeather.value = value;
};

// const getLatAndLon = async () => {
// const responseLon = await fetch("https://ipapi.co/longitude");
// const responseLat = await fetch("https://ipapi.co/latitude");
// lon.value = await responseLon.json();
// lat.value = await responseLat.json();
// console.log(lat.value, lon.value);
// };

// getLatAndLon();

async function success(pos) {
  try {
    const { latitude, longitude } = pos.coords;
    // const res = await fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    // );
    // weather.value = await res.json();
    weather.value = dataNewWeather[2];
    currentItemWeather.value = weather.value.list[0];
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
  <!-- <h1>{{ time.now() }}</h1> -->
  <div class="home">
    <div class="left-panel">
      <WeatherCity
        :weather="weather"
        :currentItemWeather="currentItemWeather"
        @update:currentItemWeather="(e) => changeCurrentItemWeather(e)"
      />
    </div>
    <div class="widget-list-and-header">
      <h2 class="header-widget-list">Others cities</h2>
      <div class="search">
        <img src="/public/searchIcon.svg" alt="" />
        <input
          v-model="city"
          class="input-city"
          type="text"
          placeholder="Kazan"
        />
      </div>
      <WidgetList />
    </div>

    <RightPanel :data="currentItemWeather" />
    <!-- <Motion /> -->
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
  /* font-variation-settings: "wdth" 100; */
  /* font-family: "Roboto", sans-serif sans-serif; */
  /* font-family: Arial, Helvetica, sans-serif sans-serif; */
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
  /* box-shadow: 40px 60px 150px 0px rgba(59, 38, 123, 0.7);
  background: linear-gradient(
    136.55deg,
    rgb(46, 51, 90) 1.538%,
    rgb(28, 27, 51) 95.915%
  ); */
  padding-bottom: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 5%;
  /* border-radius: 44px; */

  box-shadow: inset 0px 1px 0px 0px rgb(255, 255, 255),
    0px 20px 100px 0px rgba(74, 57, 127, 0.7);
  background: radial-gradient(
      100.02% 110.79% at 93% 74%,
      rgba(69, 39, 139, 0.9),
      rgba(46, 51, 90, 0.9) 100%
    )
    /* Предупреждение: градиент использует вращение, не поддерживаемое CSS, и может работать не так, как ожидается. */;
  /* align-items: center; */
}
/* .wheather {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-radius: 44px;
  box-shadow: 40px 60px 150px 0px rgba(59, 38, 123, 0.7);

  background: linear-gradient(
    136.55deg,
    rgb(46, 51, 90) 1.538%,
    rgb(28, 27, 51) 95.915%
  );
  padding: 10%;
} */
</style>
