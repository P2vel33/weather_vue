<script setup>
import dataNewWeather from "../data/dataNewWeather";
import gsap from "gsap";
import { motion } from "motion-v";
import { reactive, ref, watch } from "vue";

const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
// const dnw = dataNewWeather[0]
const dNW = dataNewWeather[0];

// const feels_like = ref(0);
// const clouds = ref(0);
// const myWeatherObject = ref({
// clouds: 0,
// feels_like: 0,
// });

// const data = dNW.list[0];
const sunrise = new Date(dNW.city.sunrise * 1000);
const sunset = new Date(dNW.city.sunset * 1000);
// const feels_like = Number(data.main.feels_like - 271.15).toFixed();
const arrayWindDirection = ["N", "N/E", "E", "S/E", "S", "S/W", "W", "N/W"];
const windDirection = ref(
  data.wind.deg >= 337.5 || data.wind.deg <= 22.5
    ? arrayWindDirection[0]
    : arrayWindDirection[Math.ceil((data.wind.deg - 22.5) / 45)]
);
// feels_like.value = Number(data.main.feels_like - 271.15).toFixed();
// clouds.value = data.clouds.all;
// myWeatherObject.feels_like = feels_like.value;
// myWeatherObject.clouds = data.clouds.all;

// watch(
//   myWeatherObject,
//   (n) => {
//     gsap.to(myWeatherObject, {
//       duration: 0.5,
//       feels_like: Number(n.feels_like) || 0,
//       clouds: Number(n.clouds) || 0,
//     });
//     console.log("WORK");
//   },
//   { deep: true, immediate: true }
// );

// watch(
//   [feels_like, clouds],
//   ([newFeelsLike, newClouds]) => {
//     myWeatherObject.value.feels_like = Number(newFeelsLike) || 0;
//     myWeatherObject.value.clouds = Number(newClouds) || 0;

//     gsap.to(myWeatherObject, {
//       duration: 0.5,
//       feels_like: myWeatherObject.value.feels_like,
//       clouds: Number(newClouds) || 0,
//     });
//     console.log("WORK");
//   },
//   { immediate: true }
// );

// console.log(data);

watch(
  () => data,
  () => {
    windDirection.value =
      data.wind.deg >= 337.5 || data.wind.deg <= 22.5
        ? arrayWindDirection[0]
        : arrayWindDirection[Math.ceil((data.wind.deg - 22.5) / 45)];
  }
);
// const changeMyObj = (obj) => {
//   myObj.value.feels_like = obj.value.feels_like;
// };
// const myObj = ref({
//   feels_like: 0,
// });
// gsap.to(myObj, {
//   feels_like: 0,
//   duration: 1,
//   delta: 0.5,
//   delay: 2,
//   onUpdate: () => {
//     myObj.value.feels_like = Number(data.main.feels_like - 271.15).toFixed();
//   },
// });
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
    // duration: ,
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
</script>

<template>
  <!-- <motion.ol :variants="container" initial="hidden" animate="show">
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ol> -->
  <!-- <motion.ul
    :initial="{ '--rotate': '0deg' }"
    :animate="{ '--rotate': '360deg' }"
    :transition="{ duration: 2 }"
  >
    <li :style="{ transform: 'rotate(var(--rotate))' }" />
    <li :style="{ transform: 'rotate(var(--rotate))' }" />
    <li :style="{ transform: 'rotate(var(--rotate))' }" />
  </motion.ul> -->
  <motion.div
    class="right-panel"
    :variants="container"
    initial="hidden"
    animate="show"
  >
    <div class="weather-element one">
      <p>Cloudy</p>
      <img class="element" src="/public/RightPanel/cloudy.svg" alt="" />
      <p class="weather-data">{{ data.clouds.all }} %</p>
    </div>
    <!-- <div class="weather-element">2</div> -->
    <motion.div class="weather-element" :variants="item">
      <p>Speed wind</p>
      <img class="element" src="/public/RightPanel/wind.svg" alt="" />
      <p class="weather-data">{{ windDirection }} {{ data.wind.gust }} m/s</p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Visiable</p>
      <img class="element" src="/public/RightPanel/visiable.svg" alt="" />
      <p class="weather-data">{{ data.visibility }} metrs</p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Probability of precipitation</p>
      <img class="element" src="/public/RightPanel/rain.svg" alt="" />
      <p class="weather-data">{{ data.pop }} %</p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Precipitation volume for 3 hours</p>
      <img class="element" src="/public/RightPanel/newosadki.svg" alt="" />
      <p class="weather-data">
        {{ data?.rain === undefined ? 0 : data?.rain["3h"] }} mm
      </p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Sunrise</p>
      <img class="element" src="/public/RightPanel/sunrise.svg" alt="" />
      <p class="weather-data">
        {{ `${sunrise.getHours()}:${sunrise.getMinutes()}` }}
      </p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Sunset</p>
      <img class="element" src="/public/RightPanel/sunset.svg" alt="" />
      <p class="weather-data">
        {{ `${sunset.getHours()}:${sunset.getMinutes()}` }}
      </p>
    </motion.div>
    <motion.div class="weather-element" :variants="item">
      <p>Feels like</p>
      <img class="element" src="/public/RightPanel/feelsLike.svg" alt="" />
      <p class="weather-data">
        {{ Number(data.main.feels_like - 271.15).toFixed() }} °C
      </p>
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
  font-family: SF Pro Display;
  font-size: 28px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

.weather-data {
  /* Default / Bold / Title1 */
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  font-size: 28px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.36px;
  text-align: center;
}

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
  width: 13vw;
  height: 13vw;
  /* font-size: 20px; */
  /* border: 1px solid rgba(69, 39, 139, 0.9); */
  border-radius: 50px;
  /* border-top-right-radius: 1000px;
  border-end-end-radius: 100px; */

  /* box-shadow: 1px 1px 10px 10px inset; */
  background: radial-gradient(
    100.02% 110.79% at 93% 74%,
    rgba(69, 39, 139, 0.9),
    rgba(46, 51, 90, 0.9) 100%
  );
  transition: background 1s ease;
  /* cursor: pointer; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* padding: 5%; */
  /* gap: 5%; */
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
