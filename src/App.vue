<script setup>
import { ref } from "vue";
import WeatherWidgets from "./components/WeatherWidgets.vue";
import WeatherCity from "./components/WeatherCity.vue";
import dataNewWeather from "./data/dataNewWeather";
import WeatherHoursOrDays from "./components/WeatherHoursOrDays.vue";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
// import Motion from "./components/Motion.vue";
const isVisiable = ref(false);
const currentItemWeather = ref(dataNewWeather[0].list[0]);
const changeCurrentItemWeather = (value) => {
  currentItemWeather.value = value;
};
</script>

<template>
  <div class="home">
    <div class="left-panel">
      <WeatherCity
        :currentItemWeather="currentItemWeather"
        @update:currentItemWeather="(e) => changeCurrentItemWeather(e)"
      />
    </div>
    <div class="widget-list-and-header">
      <h2 class="header-widget-list">Others cities</h2>
      <div class="search">
        <img src="/public/searchIcon.svg" alt="" />
        <input class="input-city" type="text" placeholder="Kazan" />
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
