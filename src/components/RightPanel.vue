<script setup>
import dataNewWeather from "../data/dataNewWeather";
import gsap from "gsap";
import {
  animate,
  motion,
  RowValue,
  useAnimate,
  useMotionValue,
  useTransform,
} from "motion-v";
import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import animationShift from "../motion/animationShift";

const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const dNW = dataNewWeather[0];

const sunrise = new Date(dNW.city.sunrise * 1000);
const sunset = new Date(dNW.city.sunset * 1000);
const arrayWindDirection = ["N", "N/E", "E", "S/E", "S", "S/W", "W", "N/W"];
const windDirection = ref(
  data.wind.deg >= 337.5 || data.wind.deg <= 22.5
    ? arrayWindDirection[0]
    : arrayWindDirection[Math.ceil((data.wind.deg - 22.5) / 45)]
);

const count1 = useMotionValue(0);
const count2 = useMotionValue(0);
const count3 = useMotionValue(0);
const count4 = useMotionValue(0);
const count5 = useMotionValue(0);
const count6 = useMotionValue(0);
const clouds = useTransform(() => Math.round(count1.get()));
const speedWind = useTransform(() => Math.round(count2.get()));
const visibility = useTransform(() => Math.round(count3.get()));
const rainPop = useTransform(() => count4.get().toFixed());
const precipitation = useTransform(() => count5.get().toFixed(2));
const feelsLike = useTransform(() => Math.round(count6.get()));

let controls;
const arrayAnimateValues = computed(() => {
  return [
    [count1, data.clouds.all, { duration: 0.3 }],
    [count2, data.wind.gust, { duration: 0.1 }],
    [
      count3,
      data?.visibility === undefined ? 10 : data?.visibility,
      { duration: 0.1 },
    ],
    [count4, data.pop * 100, { duration: 0.1 }],
    [
      count5,
      data?.rain === undefined ? 0 : data?.rain["3h"],
      { duration: 0.1 },
    ],
    [
      count6,
      Number((data.main.feels_like - 271.15).toFixed()),
      { duration: 0.1 },
    ],
  ];
});

watch(
  () => data,
  () => {
    windDirection.value =
      data.wind.deg >= 337.5 || data.wind.deg <= 22.5
        ? arrayWindDirection[0]
        : arrayWindDirection[Math.ceil((data.wind.deg - 22.5) / 45)];
  }
);
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
    <!-- <div class="weather-element">2</div> -->
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
        {{ `${sunrise.getHours()}:${sunrise.getMinutes()}` }}
      </p>
    </motion.div>
    <motion.div
      class="weather-element"
      :variants="animationShift('beforeChildren', 0.1, -50, -50).item"
    >
      <p>Sunset</p>
      <img class="element" src="/public/RightPanel/sunset.svg" alt="" />
      <p class="weather-data">
        {{ `${sunset.getHours()}:${sunset.getMinutes()}` }}
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
</template>

<style scoped>
.motion-pre {
  font-size: 64px;
  color: #4ff0b7;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

.weather-data {
  /* Default / Bold / Title1 */
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

.element {
  width: 50%;
  height: 50%;
}

.right-panel {
  margin-top: 1%;
  width: 50%;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  /* column-gap: 3%; */
  /* row-gap: 20%; */
  justify-items: center;
  align-items: start;
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
  justify-content: space-between;
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
