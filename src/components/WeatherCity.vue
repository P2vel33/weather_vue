<script setup>
import { ref } from "vue";
import WeatherWidgets from "./WeatherWidgets.vue";
import getCoordinateCity from "../hooks/getCoordinateCity";
import getWeatherCity from "../hooks/getWeatherCity";
import dataNewWeather from "../data/dataNewWeather";
import WeatherHoursOrDays from "./WeatherHoursOrDays.vue";
import { useVisiableDaysOrHoursWeather } from "../store/VisiableDaysOrHoursWeather";

// const city = ref("орел");
const { cityAndCountry } = getCoordinateCity();
const { weather, iconId, weatherDescription } = getWeatherCity();
// console.log(cityAndCountry.value.city);
// const { isVisiableDaysWeather, isVisiableHoursWeather } =
// useVisiableDaysOrHoursWeather();
const visiableDaysWeather = ref(false);
const visiableHoursWeather = ref(true);

const isVisiableDaysWeather = () => {
  visiableDaysWeather.value = true;
  visiableHoursWeather.value = false;
  console.log(visiableDaysWeather.value);
};
const isVisiableHoursWeather = () => {
  visiableDaysWeather.value = false;
  visiableHoursWeather.value = true;
  console.log(visiableHoursWeather.value);
};
const { currentItemWeather } = defineProps({
  currentItemWeather: {
    type: Object,
    required: true,
  },
});

const arrayDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Th", "Fri", "Sat"];
const currentNumberItemWeather = ref(0);

const emit = defineEmits(["update:currentItemWeather"]);
const updateCurrentItemWeather = (item) => {
  emit("update:currentItemWeather", item);
};

const changeCurrentItemWeather = (itemNumber, item) => {
  currentNumberItemWeather.value = itemNumber;
  updateCurrentItemWeather(item);
};

// console.log(arrayDaysOfWeek[new Date("2025-04-08 12:00:00").getDay()]);
// console.log(weather.value);
// console.log(weather);
// console.log(weather.value.temp);
// const city = cityAndCountry.value.city;
// const temp = Number(weather.value.temp - 271.15).toFixed();
// console.log(temp);
// const temp_max = Number(weather.value.temp_max - 273.15).toFixed();
// const temp_min = Number(weather.value.temp_min - 273.15).toFixed();
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
          {{
            weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1)
          }}
        </p>
        <p class="label22">
          H:{{ Number(weather.temp_max - 273.15).toFixed() }}° L:{{
            Number(weather.temp_min - 273.15).toFixed()
          }}°
        </p>
      </div>
    </div>
    <div class="homes"></div>
    <div class="rectangle-home-and-ellipse">
      <div class="rectangleHome">
        <div class="div-hour-or-week">
          <button class="hour-or-week" @click="isVisiableHoursWeather">
            Hourly Forecast
          </button>
          <button class="hour-or-week" @click="isVisiableDaysWeather">
            Weekly Forecast
          </button>
        </div>
        <div class="weather-hours-scroll">
          <WeatherHoursOrDays
            v-if="visiableHoursWeather"
            v-for="(item, index) of dataNewWeather[0].list.filter(
              (el, index) => index < 9
            )"
            :key="dataNewWeather[0].list.dt"
            :data="item"
            :class="{ active: index === currentNumberItemWeather }"
            @click="changeCurrentItemWeather(index, item)"
            :visiableDaysWeather
            :visiableHoursWeather
          />
          <WeatherHoursOrDays
            v-if="visiableDaysWeather"
            v-for="(item, index) of dataNewWeather[0].list.filter(
              (el, index) => index % 8 === 0
            )"
            :key="dataNewWeather[0].list.dt"
            :data="item"
            :class="{ active: index === currentNumberItemWeather }"
            @click="changeCurrentItemWeather(index, item)"
            :visiableDaysWeather
            :visiableHoursWeather
          />
        </div>
      </div>
      <!-- <div class="ellipseRight"></div> -->
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: rgb(72, 49, 157);
  transition: background-color 1s ease;
}
.rectangle-home-and-ellipse {
  display: flex;
  margin-top: -25%;
}
.weather-hours-scroll::-webkit-scrollbar {
  width: auto;
}

.weather-hours-scroll::-webkit-scrollbar-track {
  background: none; /* цвет зоны отслеживания */
}

.weather-hours-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(28, 27, 51) 95.915%; /* цвет бегунка */
  border-radius: 20px; /* округлось бегунка */
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.weather-hours-scroll {
  /* margin-top: -70%; */
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-right: 5%;
  /* align-items: center; */
  /* justify-content: center; */
  gap: 20px;
  overflow-x: auto;
  /* overflow-y: auto; */
  /* z-index: 100; */
  scroll-behavior: smooth;
  /* transform: rotate(-90deg) translateY(-60px); */
  /* transform-origin: right top; */
  /* transform: rotate(-90deg); */
  /* scrollbar-color: */
}

/* .weather-hours-scroll > div { */
/* transform: rotate(90deg); */
/* transform-origin: left top; */
/* } */

.div-hour-or-week {
  /* margin-top: -80%; */
  width: 100%;
  display: flex;
  flex-direction: row;
  /* gap: 50px; */
  justify-content: space-around;
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
  z-index: 3;
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
  /* Default / Bold / LargeTitle */
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-top: 50px;
}

.temp {
  width: 127px;
  height: 70px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 96px;
  font-weight: 200;
  line-height: 70px;
  letter-spacing: 0.37px;
  text-align: center;
}

.label2 {
  width: 115px;
  height: 48px;
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
  font-size: 13px;
  text-align: center;
}

.label22 {
  color: white;
  height: 100%;
  font-size: 17px;
}

.back {
  align-items: center;
  text-align: center;
  justify-content: center;
  /* width: 390px; */
  /* height: 844px; */
  border-radius: 50px;
}
.homes {
  width: 392px;
  height: 390px;
  background-image: url("/public/House.svg");
  background-repeat: no-repeat;
}
.rectangleHome {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* align-items: center; */
  gap: 50px;
  height: 325px;
  width: 392px;
  background-repeat: no-repeat;
  background-image: url("/public/RectangleHome.svg");
  background-color: rgba(46, 51, 90, 0.9);
  border-radius: 50px;
  z-index: 2;
}
.ellipseRight {
  height: 250px;
  width: 250px;
  margin-top: 7%;
  /* margin-right: 20%; */
  z-index: 0;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseRight.svg");
  border-radius: 50%;
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
  height: 325px;
  width: 390px;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseTop.svg");
}
.ellipseTopSmall {
  height: 325px;
  width: 390px;
  background-repeat: no-repeat;
  background-image: url("/public/EllipseTopSmall.svg");
}
</style>
