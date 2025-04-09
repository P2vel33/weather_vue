<script setup>
import dataNewWeather from "../data/dataNewWeather";
const dNW = dataNewWeather[0];
const data = dNW.list[0];
const sunrise = new Date(dNW.city.sunrise * 1000);
const sunset = new Date(dNW.city.sunset * 1000);
const feels_like = Number(data.main.feels_like - 271.15).toFixed();
const arrayWindDirection = ["N", "N/E", "E", "S/E", "S", "S/W", "W", "N/W"];
data.wind.deg = 350;
const windDirection =
  data.wind.deg >= 337.5 || data.wind.deg <= 22.5
    ? arrayWindDirection[0]
    : arrayWindDirection[Math.ceil((data.wind.deg - 22.5) / 45)];
</script>

<template>
  <div class="right-panel">
    <div class="weather-element one">
      <p>Cloudy</p>
      <img class="firstElement" src="/public/RightPanel/cloudy.svg" alt="" />
      <p>{{ data.clouds.all }} %</p>
    </div>
    <!-- <div class="weather-element">2</div> -->
    <div class="weather-element">
      <p>Speed wind</p>
      <img class="element" src="/public/RightPanel/wind.svg" alt="" />
      <p>{{ data.wind.gust }}, m/s {{ windDirection }}</p>
    </div>
    <div class="weather-element">
      <p>Visiable</p>
      <img class="element" src="/public/RightPanel/visiable.svg" alt="" />
      <p>{{ data.visibility }}, metrs</p>
    </div>
    <div class="weather-element">
      <p>Probability of precipitation</p>
      <img class="element" src="/public/RightPanel/rain.svg" alt="" />
      <p>{{ data.pop }} %</p>
    </div>
    <div class="weather-element">
      <p>Precipitation volume for 3 hours</p>
      <img class="element" src="/public/RightPanel/newosadki.svg" alt="" />
      <p>{{ data.rain["3h"] }}, mm</p>
    </div>
    <div class="weather-element">
      <p>Sunrise</p>
      <img class="element" src="/public/RightPanel/sunrise.svg" alt="" />
      <p>{{ `${sunrise.getHours()}:${sunrise.getMinutes()}` }}</p>
    </div>
    <div class="weather-element">
      <p>Sunset</p>
      <img class="element" src="/public/RightPanel/sunset.svg" alt="" />
      <p>{{ `${sunset.getHours()}:${sunset.getMinutes()}` }}</p>
    </div>
    <div class="weather-element">
      <p>Feels like</p>
      <img class="element" src="/public/RightPanel/feelsLike.svg" alt="" />
      <p>{{ feels_like }}, °C</p>
    </div>
  </div>
</template>

<style scoped>
.firstElement {
  width: 80%;
  height: 80%;
}

.element {
  width: 50%;
  height: 50%;
  /* background-color: azure; */
}

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
}

.weather-element:hover {
  /* Weather Color/Linear/3 */
  /* Weather Color/Linear/2 */
  background: linear-gradient(
    90deg,
    rgb(89, 54, 180),
    rgb(54, 42, 132) 103.55%
  );
  transition: background-color 1s ease;
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
