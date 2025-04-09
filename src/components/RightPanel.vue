<script setup>
import dataNewWeather from "../data/dataNewWeather";
const dNW = dataNewWeather[0];
const data = dNW.list[0];
const sunrise = new Date(dNW.city.sunrise * 1000);
const sunset = new Date(dNW.city.sunset * 1000);
const feels_like = Number(data.main.feels_like - 271.15).toFixed();
</script>

<template>
  <div class="right-panel">
    <div class="weather-element one">Cloudy: {{ data.clouds.all }}%</div>
    <!-- <div class="weather-element">2</div> -->
    <div class="weather-element">
      Speed wind:{{ data.wind.gust }}, deg wind:{{ data.wind.deg }}°
    </div>
    <div class="weather-element">Visiable: {{ data.visibility }}, metrs</div>
    <div class="weather-element">Вероятность осадков: {{ data.pop }}%</div>
    <div class="weather-element">
      Объём осадков за 3 часа: {{ data.rain["3h"] }},мм
    </div>
    <div class="weather-element">
      Восход: {{ `${sunrise.getHours()}:${sunrise.getMinutes()}` }}
    </div>
    <div class="weather-element">
      Закат: {{ `${sunset.getHours()}:${sunset.getMinutes()}` }}
    </div>
    <div class="weather-element">Feels like: {{ feels_like }}°C</div>
  </div>
</template>

<style scoped>
.right-panel {
  margin-top: 1%;
  width: 50%;
  /* border: 5px solid wheat; */
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  column-gap: 3%;
  row-gap: 2%;
  justify-items: center;
  align-items: start;
  overflow-y: auto;
  /* grid-column-start: 2; */
}

.weather-element {
  /* align-items: center; */
  /* text-align: center; */
  /* vertical-align: center; */
  color: white;
  width: 14vw;
  height: 14vw;
  font-size: 20px;
  /* border: 1px solid rgba(69, 39, 139, 0.9); */
  border-radius: 25px;
  /* box-shadow: 1px 1px 10px 10px inset; */
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(69, 39, 139, 0.9),
    rgba(46, 51, 90, 0.9) 100%
  );
  transition: background 1s ease;
  cursor: pointer;
}

.weather-element:hover {
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(65, 7, 199, 0.9),
    rgba(15, 19, 46, 0.9) 100%
  );
  transition: background 1s ease;
}

.one {
  grid-column: 1/3;
  width: calc(28vw + 3%);
}

.right-panel::-webkit-scrollbar {
  width: auto;
}

.right-panel::-webkit-scrollbar-track {
  background: none; /* цвет зоны отслеживания */
}

.right-panel::-webkit-scrollbar-thumb {
  background-color: rgb(28, 27, 51) 95.915%; /* цвет бегунка */
  border-radius: 20px; /* округлось бегунка */
  border: 1px solid rgba(255, 255, 255, 0.9);
}
</style>
