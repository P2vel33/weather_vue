<script setup>
import {
  animate,
  motion,
  RowValue,
  useMotionValue,
  useTransform,
} from "motion-v";
import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import animationShift from "../motion/animationShift";
import { useCityAndWeather } from "../store/useCityAndWeather";
const cityAndWeather = useCityAndWeather();

// const { data, weather } = defineProps({
//   data: {
//     type: Object,
//     required: true,
//   },
//   weather: {
//     type: Object,
//     required: true,
//   },
// });

const arrayWindDirection = ["N", "N/E", "E", "S/E", "S", "S/W", "W", "N/W"];
const windDirection = ref(
  cityAndWeather.currentItemWeather.wind.deg >= 337.5 ||
    cityAndWeather.currentItemWeather.wind.deg <= 22.5
    ? arrayWindDirection[0]
    : arrayWindDirection[
        Math.ceil((cityAndWeather.currentItemWeather.wind.deg - 22.5) / 45)
      ]
);

const count1 = useMotionValue(0);
const count2 = useMotionValue(0);
const count3 = useMotionValue(0);
const count4 = useMotionValue(0);
const count5 = useMotionValue(0);
const count6 = useMotionValue(0);
const count7 = useMotionValue(0);
const count8 = useMotionValue(0);
const count9 = useMotionValue(0);
const count10 = useMotionValue(0);
const clouds = useTransform(() => Math.round(count1.get()));
const speedWind = useTransform(() => Math.round(count2.get()));
const visibility = useTransform(() => Math.round(count3.get()));
const rainPop = useTransform(() => count4.get().toFixed());
const precipitation = useTransform(() => count5.get().toFixed(2));
const feelsLike = useTransform(() => Math.round(count6.get()));
const sunriseOne = useTransform(() => Math.round(count7.get()));
const sunriseTwo = useTransform(() =>
  Math.round(count8.get()) < 9
    ? `0${Math.round(count8.get())}`
    : Math.round(count8.get())
);
const sunsetOne = useTransform(() => Math.round(count9.get()));
const sunsetTwo = useTransform(() =>
  Math.round(count10.get()) < 9
    ? `0${Math.round(count10.get())}`
    : Math.round(count10.get())
);

let controls;
const arrayAnimateValues = computed(() => {
  return [
    [count1, cityAndWeather.currentItemWeather.clouds.all, { duration: 0.3 }],
    [count2, cityAndWeather.currentItemWeather.wind.gust, { duration: 0.1 }],
    [
      count3,
      cityAndWeather.currentItemWeather?.visibility === undefined
        ? 10
        : cityAndWeather.currentItemWeather?.visibility,
      { duration: 0.1 },
    ],
    [count4, cityAndWeather.currentItemWeather.pop * 100, { duration: 0.1 }],
    [
      count5,
      cityAndWeather.currentItemWeather?.rain === undefined
        ? 0
        : cityAndWeather.currentItemWeather?.rain["3h"],
      { duration: 0.1 },
    ],
    [
      count6,
      Number(
        (cityAndWeather.currentItemWeather.main.feels_like - 271.15).toFixed()
      ),
      { duration: 0.1 },
    ],
    [
      count7,
      Number(new Date(cityAndWeather.weather.city.sunrise * 1000).getHours()),
      { duration: 0.1 },
    ],
    [
      count8,
      Number(new Date(cityAndWeather.weather.city.sunrise * 1000).getMinutes()),
      { duration: 0.1 },
    ],
    [
      count9,
      Number(new Date(cityAndWeather.weather.city.sunset * 1000).getHours()),
      { duration: 0.1 },
    ],
    [
      count10,
      Number(new Date(cityAndWeather.weather.city.sunset * 1000).getMinutes()),
      { duration: 0.1 },
    ],
  ];
});
watch(cityAndWeather.currentItemWeather, () => {
  windDirection.value =
    cityAndWeather.currentItemWeather.wind.deg >= 337.5 ||
    cityAndWeather.currentItemWeather.wind.deg <= 22.5
      ? arrayWindDirection[0]
      : arrayWindDirection[
          Math.ceil((cityAndWeather.currentItemWeather.wind.deg - 22.5) / 45)
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
  <motion.div class="right-panel-main">
    <h2 class="weather-parameters-header">Weather parameters</h2>
    <motion.div
      class="right-panel"
      :variants="animationShift('beforeChildren', 0.1, -50, -50).container"
      initial="hidden"
      animate="show"
    >
      <div class="weather-element one">
        <p>Cloudy</p>
        <img class="element" src="/public/RightPanel/cloudy.svg" alt="" />
        <p class="weather-data"><RowValue :value="clouds" /> %</p>
      </div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, 50, 50).item"
      >
        <p>Speed wind</p>
        <img class="element" src="/public/RightPanel/wind.svg" alt="" />
        <p class="weather-data">
          {{ windDirection }} <RowValue :value="speedWind" /> m/s
        </p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, -50, -50).item"
      >
        <p>Visiable</p>
        <img class="element" src="/public/RightPanel/visiable.svg" alt="" />
        <p class="weather-data">≈ <RowValue :value="visibility" /> metrs</p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, 50, 50).item"
      >
        <p>Probability of precipitation</p>
        <img class="element" src="/public/RightPanel/rain.svg" alt="" />
        <p class="weather-data"><RowValue :value="rainPop" /> %</p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, -50, -50).item"
      >
        <p>Precipitation volume for 3 hours</p>
        <img class="element" src="/public/RightPanel/newosadki.svg" alt="" />
        <p class="weather-data"><RowValue :value="precipitation" /> mm</p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, 50, 50).item"
      >
        <p>Sunrise</p>
        <img class="element" src="/public/RightPanel/sunrise.svg" alt="" />
        <p class="weather-data">
          <RowValue :value="sunriseOne" />:<RowValue :value="sunriseTwo" />
        </p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, -50, -50).item"
      >
        <p>Sunset</p>
        <img class="element" src="/public/RightPanel/sunset.svg" alt="" />
        <p class="weather-data">
          <RowValue :value="sunsetOne" />:<RowValue :value="sunsetTwo" />
        </p>
      </motion.div>
      <motion.div
        class="weather-element"
        :variants="animationShift('beforeChildren', 0.1, 50, 50).item"
      >
        <p>Feels like</p>
        <img class="element" src="/public/RightPanel/feelsLike.svg" alt="" />
        <p class="weather-data"><RowValue :value="feelsLike" /> °C</p>
      </motion.div>
    </motion.div>
  </motion.div>
</template>

<style scoped>
p {
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

.right-panel-main {
  display: flex;
  flex-direction: column;
}

.weather-parameters-header {
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: center;
}

.weather-data {
  /* Default / Bold / Title1  */
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

.element {
  width: 40%;
  height: 40%;
}

.right-panel {
  min-height: 870px;
  min-width: 400px;
  width: max-content;
  height: max-content;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  align-content: space-between;
  justify-content: space-between;
  overflow-y: auto;
}

.weather-element {
  color: white;
  width: 80%;
  height: 80%;
  border-radius: 50px;
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(69, 39, 139, 0.9),
    rgba(46, 51, 90, 0.9) 100%
  );
  transition: background 1s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.weather-element:hover {
  background: linear-gradient(
    90deg,
    rgb(89, 54, 180),
    rgb(54, 42, 132) 103.55%
  );
  transition: background-color 1s ease;
}

.one {
  grid-column: 1/3;
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
