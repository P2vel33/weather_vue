<script setup>
import { animate, RowValue, useMotionValue, useTransform } from "motion-v";
import { computed, onMounted, onUnmounted, onUpdated } from "vue";

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
const arrayDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Th", "Fri", "Sat"];
let controls = null;
const count1 = useMotionValue(0);
const count2 = useMotionValue(0);
const temp = useTransform(() => Math.round(count1.get()));
const rain = useTransform(() => Math.round(count2.get()));

const arrayAnimateValues = computed(() => {
  return [
    [count1, Number((data.main.temp - 273.15).toFixed()), { duration: 0.1 }],
    [
      count2,
      data?.rain === undefined ? 0 : Number(data?.rain["3h"].toFixed()),
      { duration: 0.1 },
    ],
  ];
});

onMounted(() => {
  controls = animate(arrayAnimateValues.value);
});

onUpdated(() => {
  controls = animate(arrayAnimateValues.value);
});

onUnmounted(() => {
  controls?.stop();
});
</script>
<template>
  <div class="hour-or-day">
    <p class="time" v-if="visiableDaysWeather">
      {{ arrayDaysOfWeek[new Date(data.dt_txt).getDay()] }}
    </p>
    <p class="time" v-else-if="visiableHoursWeather">
      {{ data.dt_txt.slice(-8, -3) }}
    </p>
    <div class="image-weather-and-humidity">
      <img
        class="image"
        :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
      />
      <p class="rain"><RowValue :value="rain" />%</p>
    </div>
    <p class="temp"><RowValue :value="temp" />°</p>
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
