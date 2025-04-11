<script setup>
import { ref, watch } from "vue";
import { useVisiableDaysOrHoursWeather } from "../store/VisiableDaysOrHoursWeather";

const { data, visiableDaysWeather, visiableHoursWeather } = defineProps({
  data: {
    type: Object,
    required: true,
  },
  visiableDaysWeather: {
    type: Boolean,
    required: true,
  },
  visiableHoursWeather: {
    type: Boolean,
    required: true,
  },
});
// const { visiableDaysWeather, visiableHoursWeather } =
// useVisiableDaysOrHoursWeather();
const temp = Number(data.main.temp - 271.15).toFixed();
const time = data.dt_txt.slice(-8, -3);
const arrayDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Th", "Fri", "Sat"];
const days = arrayDaysOfWeek[new Date(data.dt_txt).getDay()];
const iconWeather = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
</script>
<template>
  <div class="hour-or-day">
    <p class="time" v-if="visiableDaysWeather">{{ days }}</p>
    <p class="time" v-else-if="visiableHoursWeather">{{ time }}</p>
    <div class="image-weather-and-humidity">
      <img class="image" :src="iconWeather" />
      <p class="rain">
        {{ data?.rain === undefined ? 0 : data?.rain["3h"].toFixed() }}%
      </p>
    </div>
    <p class="temp">{{ temp }}°</p>
  </div>
</template>

<style scoped>
.image {
  width: 40px;
  height: 40px;
}

.rain {
  /* Default/Bold/Footnote */
  color: rgb(64, 203, 216);
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.08px;
  text-align: center;
}

.image-weather-and-humidity {
  display: flex;
  flex-direction: column;
}

.temp {
  /* Default/Regular/Title3 */
  width: 30px;
  height: 24px;
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.38px;
  text-align: center;
}

.time {
  /* Default/Bold/Subheadline */
  width: 43px;
  height: 20px;
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;
}

.hour-or-day {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 2;
  height: 146px;
  width: 60px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  background: rgba(72, 49, 157, 0.2);
  transition: background 1s ease;
}

.hour-or-day:hover {
  background-color: rgb(72, 49, 157);
  transition: background-color 1s ease;
}

.active {
  background-color: rgb(72, 49, 157);
  transition: background-color 1s ease;
}
</style>
