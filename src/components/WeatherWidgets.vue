<script setup>
import { motion } from "motion-v";
import animationShift from "../motion/animationShift";
import { inject, watch } from "vue";
import { useCityAndWeather } from "../store/useCityAndWeather";

const cityAndWeather = useCityAndWeather();
const { dataNewWeather, dataCity } = defineProps({
  dataNewWeather: {
    type: Object,
    required: true,
  },
  dataCity: {
    type: Object,
    required: true,
  },
});

// const { setWeather, setCityName } = inject("currentItem");
</script>

<template>
  <motion.div
    class="content"
    @click="
      cityAndWeather.setWeather(dataNewWeather);
      cityAndWeather.setCityName(dataCity[0].name);
    "
  >
    <div class="div">
      <div class="rectangle">
        <p class="label1">
          {{ Number((dataNewWeather.list[0].main.temp - 273.15).toFixed()) }}°
        </p>
        <img
          class="image"
          :src="`https://openweathermap.org/img/wn/${dataNewWeather.list[0].weather[0].icon}@2x.png`"
        />
        <div class="label2">
          <p class="label21">
            H:{{
              Number((dataNewWeather.list[0].main.temp_max - 273.15).toFixed())
            }}° L:{{
              Number((dataNewWeather.list[0].main.temp_min - 273.15).toFixed())
            }}°
          </p>
          <p class="label22">
            {{ dataCity[0].name }},
            {{
              dataCity[0].state === dataCity[0].name
                ? ""
                : `${dataCity[0].state}, `
            }}{{ dataCity[0].country }}
          </p>
        </div>
        <p class="label3">
          {{ dataNewWeather.list[0].weather[0].description }}
        </p>
      </div>
    </div>
  </motion.div>
</template>

<style scoped>
.city {
  font-size: 100px;
  font-weight: 700;
  color: white;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
  cursor: pointer;
}
.div {
  position: relative;
  width: 342px;
  height: 184px;
  align-items: center;
}
.rectangle {
  position: absolute;
  background-image: url("/public/Subtract.svg");
  width: 342px;
  height: 174px;
  background-repeat: no-repeat;
  top: 11px;
  bottom: 1px;
  display: flex;
  justify-content: center;
}
.label1 {
  position: absolute;
  width: 95px;
  height: 41px;
  left: 20px;
  top: 48px;
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: left;
}
.label2 {
  position: absolute;
  width: 160px;
  height: 41px;
  left: 20px;
  top: 113px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0px;
  margin: 0;
}

.label3 {
  position: absolute;
  width: 100px;
  height: 18px;
  left: 220px;
  top: 136px;
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.08px;
}
.label21 {
  color: rgba(235, 235, 245, 0.6);
  height: 100%;
  text-align: left;
  vertical-align: text-top;
  font-size: 13px;
}

.label22 {
  color: white;
  height: 100%;
  text-align: left;
  font-size: 17px;
}
.image {
  position: absolute;
  width: 160px;
  height: 160px;
  left: 175px;
  top: -30px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
