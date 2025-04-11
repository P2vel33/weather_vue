<script setup>
import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import getCoordinateCity from "../hooks/getCoordinateCity";
import WeatherHoursOrDays from "./WeatherHoursOrDays.vue";
import {
  animate,
  motion,
  RowValue,
  useMotionValue,
  useTransform,
} from "motion-v";
import animationShift from "../motion/animationShift";

// const { cityAndCountry } = getCoordinateCity();
const visiableDaysWeather = ref(false);
const visiableHoursWeather = ref(true);
// const activeWidgetDays = computed(() => {

// })

const isVisiableDaysWeather = () => {
  visiableDaysWeather.value = true;
  visiableHoursWeather.value = false;
};
const isVisiableHoursWeather = () => {
  visiableDaysWeather.value = false;
  visiableHoursWeather.value = true;
};
const { currentItemWeather, weather } = defineProps({
  currentItemWeather: {
    type: Object,
    required: true,
  },
  weather: {
    type: Object,
    required: true,
  },
  weatherCity: {
    type: String,
    required: true,
  },
});

const currentNumberItemWeather = ref(0);
const currentNumberItemWeatherDay = ref(0);

const emit = defineEmits(["update:currentItemWeather"]);
const updateCurrentItemWeather = (item) => {
  emit("update:currentItemWeather", item);
};

const changeCurrentItemWeather = (itemNumber, item) => {
  currentNumberItemWeather.value = itemNumber;
  updateCurrentItemWeather(item);
};

const changeCurrentItemWeatherDay = (itemNumber, item) => {
  isVisiableHoursWeather();
  currentNumberItemWeather.value = 0;
  currentNumberItemWeatherDay.value = itemNumber;
  updateCurrentItemWeather(item);
};

const weatherOfDay = ref(0);
const changeWeatherOfDay = (value) => {
  weatherOfDay.value = value;
};

const count1 = useMotionValue(0);
const count2 = useMotionValue(0);
const count3 = useMotionValue(0);
let controls;
const temp = useTransform(() => Math.round(count1.get()));
const temp_min = useTransform(() => Math.round(count2.get()));
const temp_max = useTransform(() => Math.round(count3.get()));

const arrayAnimateValues = computed(() => {
  return [
    [
      count1,
      Number((currentItemWeather.main.temp - 273.15).toFixed()),
      { duration: 1 },
    ],
    [
      count2,
      Number((currentItemWeather.main.temp_min - 273.15).toFixed()),
      { duration: 0.1 },
    ],
    [
      count3,
      Number((currentItemWeather.main.temp_max - 273.15).toFixed()),
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
  <motion.div
    class="back"
    :variants="animationShift('beforeChildren', 0, -50, -50).container"
    initial="hidden"
    animate="show"
  >
    <motion.div
      class="content"
      :variants="animationShift('beforeChildren', 0, -50, -50).container"
      initial="hidden"
      animate="show"
    >
      <p class="city-name">{{ weatherCity }}</p>
      <p class="temp"><RowValue :value="temp" />°</p>
      <div class="label2">
        <p class="label21">
          {{
            weather.list[0].weather[0].description.charAt(0).toUpperCase() +
            weather.list[0].weather[0].description.slice(1)
          }}
        </p>
        <p class="label22">
          H:<RowValue :value="temp_max" />° L:<RowValue :value="temp_min" />°
        </p>
      </div>
    </motion.div>
    <div class="homes"></div>
    <div class="rectangle-home-and-ellipse">
      <div class="rectangleHome">
        <div class="div-hour-or-week">
          <button
            class="hour-or-week"
            :id="visiableHoursWeather ? 'active-widget-button' : ''"
            @click="isVisiableHoursWeather"
          >
            Hourly Forecast
          </button>
          <button
            class="hour-or-week"
            :id="visiableDaysWeather ? 'active-widget-button' : ''"
            @click="isVisiableDaysWeather"
          >
            Weekly Forecast
          </button>
        </div>
        <div class="weather-hours-scroll">
          <WeatherHoursOrDays
            v-if="visiableHoursWeather"
            v-for="(item, index) of weather.list.filter((el, index) => {
              return 8 * weatherOfDay < index && index < 8 * (weatherOfDay + 1);
            })"
            :key="weather.list.dt"
            :data="item"
            :class="{
              'active-widget-item': index === currentNumberItemWeather,
            }"
            @click="changeCurrentItemWeather(index, item)"
            :visiableDaysWeather
            :visiableHoursWeather
          />
          <WeatherHoursOrDays
            v-if="visiableDaysWeather"
            v-for="(item, index) of weather.list.filter(
              (el, index) => index % 8 === 0
            )"
            :key="weather.list.dt"
            :data="item"
            :class="{
              'active-widget-item': index === currentNumberItemWeatherDay,
            }"
            @click="
              changeCurrentItemWeatherDay(index, item);
              changeWeatherOfDay(index);
            "
            :visiableDaysWeather
            :visiableHoursWeather
          />
        </div>
      </div>
    </div>
  </motion.div>
</template>

<style scoped>
#active-widget-button {
  box-shadow: 0px 10px 10px 0px rgba(74, 57, 127, 0.7);
  border-bottom: 1px solid rgba(74, 57, 127, 1);
  color: white;
  transition: all 0.5s linear;
}

.active-widget-item {
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
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-right: 5%;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.div-hour-or-week {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 25px;
}
.hour-or-week {
  /* Default/Bold/Subheadline */
  color: rgba(235, 235, 245, 0.6);
  /* color: rebeccapurple; */
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  /* z-index: 3; */
  transition: all 0.5s;
}
.hour-or-week:hover {
  box-shadow: 0px 10px 10px 0px rgba(74, 57, 127, 0.7);
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.5s;
}

.city-name {
  /* Default / Bold / LargeTitle */
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
  font-size: 96px;
  font-weight: 200;
  line-height: 70px;
  letter-spacing: 0.37px;
  text-align: center;
}

.label2 {
  width: 115px;
  height: 48px;
  font-family: "Roboto", sans-serif;
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
