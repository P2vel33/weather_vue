<script setup>
import { ref } from "vue";
import WeatherWidgets from "./WeatherWidgets.vue";
import getCoordinateCity from "../hooks/getCoordinateCity";
import getWeatherCity from "../hooks/getWeatherCity";
import dataNewWeather from "../data/dataNewWeather";
import WeatherHoursOrDays from "./WeatherHoursOrDays.vue";

const city = ref("орел");
const { cityAndCountry } = getCoordinateCity();
const { weather, iconId } = getWeatherCity();
</script>

<template>
  <!-- <div>
    <WeatherWidgets
      :weather="weather"
      :cityAndCountry="cityAndCountry"
      :iconId="iconId"
    />
  </div> -->
  <div class="back">
    <div class="content">
      <p class="city-name">{{ cityAndCountry.city }}</p>
      <p class="temp">{{ Number(weather.temp - 271.15).toFixed() }}°</p>
      <div class="label2">
        <p class="label21">
          {{ iconId }}
        </p>
        <p class="label22">
          H:{{ Number(weather.temp_max - 273.15).toFixed() }}° L:{{
            Number(weather.temp_min - 273.15).toFixed()
          }}°
        </p>
      </div>
    </div>
    <div class="div-hour-or-week">
      <button class="hour-or-week">Hourly Forecast</button>
      <button class="hour-or-week">Weekly Forecast</button>
    </div>
    <div class="time-weather">
      <div
        v-for="(item, index) of dataNewWeather.list.filter(
          (el, index) => index < 4
        )"
        :key="index"
      >
        <WeatherHoursOrDays :data="item" />
      </div>
    </div>

    <div class="homes"></div>
    <div class="rectangleHome"></div>
    <div class="ellipseRight"></div>
  </div>
</template>

<style scoped>
/* img {
  border-end-end-radius: 50%;
  border-end-start-radius: 50%;
  border-start-start-radius: 40%;
} */
.time-weather {
  padding-top: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}

.div-hour-or-week {
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  padding-top: 360px;
  border-radius: 25px;
}
.hour-or-week {
  /* Default/Bold/Subheadline */
  color: rgba(235, 235, 245, 0.6);
  font-family: SF Pro Text;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  transition: all 0.5s linear;
  /* border-bottom: 3px solid white; */
}
.hour-or-week:hover {
  /* border-radius: 44px; */

  /* box-shadow: inset 0px 1px 0px 0px rgb(255, 255, 255),0px 20px 100px 0px rgba(74, 57, 127, 0.7); */
  /* background: radial-gradient(70.88% 110.79% at 93% 74%,rgb(69, 39, 139),rgb(46, 51, 90) 100%)Предупреждение: градиент использует вращение, не поддерживаемое CSS, и может работать не так, как ожидается.; */
  box-shadow: 0px 10px 10px 0px rgba(74, 57, 127, 0.7);
  /* rgba(83, 13, 97, 0.5); */
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.5s linear;
}

.city-name {
  /* position: absolute; */
  /* left: 130px; */
  /* top: 98px; */
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 34px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 50px;
}

p {
  text-align: center;
  align-items: center;
  justify-items: center;
}

.temp {
  /* 19° */
  /* position: absolute; */
  width: 127px;
  height: 70px;
  /* left: 132px; */
  /* top: 151px; */
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 96px;
  font-weight: 200;
  line-height: 70px;
  letter-spacing: 0.37px;
  text-align: center;
}

.label2 {
  /* Label */
  /* position: absolute; */
  width: 115px;
  height: 48px;
  /* left: 138px; */
  /* top: 233px; */
  font-family: SF Pro Display;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.38px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0px;
  margin: 0;
}
.label21 {
  color: rgba(235, 235, 245, 0.6);
  height: 100%;
  vertical-align: text-top;
  /* font-size: 2.71vw; */
  font-size: 13px;
  text-align: center;
}

.label22 {
  color: white;
  height: 100%;
  /* font-size: 3.55vw; */
  font-size: 17px;
}

.back {
  position: relative;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* background-image: url("/public/BackgroundHome.svg"); */
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  width: 390px;
  height: 844px;
  border-radius: 50px;
}
.homes {
  position: absolute;
  /* left: 74px; */
  top: 320px;
  width: 392px;
  height: 390px;
  background-image: url("/public/House.svg");
  /* background: none; */
  background-repeat: no-repeat;
}
.rectangleHome {
  position: absolute;
  /* left: 74px; */
  top: 575px;
  height: 325px;
  width: 392px;
  background-repeat: no-repeat;
  background-image: url("/public/RectangleHome.svg");
  background-color: rgba(46, 51, 90, 0.9);
  border-radius: 50px;
  /* z-index: 1; */
}
.ellipseRight {
  position: absolute;
  left: 271px;
  top: 620px;
  height: 250px;
  width: 250px;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseRight.svg");
  border-radius: 50%;
  /* z-index: 2; */
  border-right: 50px transparent;
  filter: blur(140px);
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(97, 47, 171, 0),
    rgb(97, 47, 171),
    rgba(97, 47, 171, 0),
    rgb(97, 47, 171)
  );
}
.ellipseTop {
  position: absolute;
  left: 50px;
  top: 520px;
  height: 325px;
  width: 390px;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseTop.svg");
}
.ellipseTopSmall {
  position: absolute;
  left: 50px;
  top: 520px;
  height: 325px;
  width: 390px;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseTopSmall.svg");
}
</style>
