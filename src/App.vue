<script setup>
import { ref } from "vue";
import WeatherWidgets from "./components/WeatherWidgets.vue";
import WeatherCity from "./components/WeatherCity.vue";
import dataNewWeather from "./data/dataNewWeather";
import WeatherHoursOrDays from "./components/WeatherHoursOrDays.vue";
import RightPanel from "./components/RightPanel.vue";
import WidgetList from "./components/WidgetList.vue";
const isVisiable = ref(false);
</script>

<template>
  <div class="home">
    <div class="left-panel">
      <WeatherCity />
    </div>
    <div class="widget-list-and-header">
      <h2 class="header-widget-list">Others cities</h2>
      <WidgetList />
    </div>

    <RightPanel />
  </div>
</template>

<style>
* {
  margin: 0%;
}

.widget-list-and-header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.header-widget-list {
  text-align: center;
  color: white;
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 34px;
  font-weight: 400;
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
