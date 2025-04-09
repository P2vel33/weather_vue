<script setup>
const { dataWeather, dataCity } = defineProps({
  dataWeather: {
    type: Object,
    required: true,
  },
  dataCity: {
    type: Object,
    required: true,
  },
});

const city = dataCity[0].name;
const country = dataCity[0].country;
const state = dataCity[0].state;
const temp = Number(dataWeather.main.temp - 273.15).toFixed();
const temp_max = Number(dataWeather.main.temp_max - 273.15).toFixed();
const temp_min = Number(dataWeather.main.temp_min - 273.15).toFixed();
const iconId = dataWeather.weather[0].id;
const weatherDescription = dataWeather.weather[0].description;
const iconWeather = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;
// console.log(city);
</script>

<template>
  <div class="content">
    <!-- <p class="city">{{ city }}:</p> -->
    <div class="div">
      <div class="rectangle">
        <!-- <img src="/public/Subtract.svg" class="rectangle" /> -->
        <p class="label1">{{ temp }}°</p>
        <img class="image" :src="iconWeather" />
        <div class="label2">
          <p class="label21">H:{{ temp_max }}° L:{{ temp_min }}°</p>
          <p class="label22">
            {{ city }}, {{ state === city ? "" : `${state}, ` }}{{ country }}
          </p>
        </div>
        <p class="label3">{{ weatherDescription }} {{ iconId }}</p>
      </div>
    </div>
  </div>
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
}
.div {
  position: relative;
  /* width: 100%; */
  /* height: 83vh; */
  width: 342px;
  height: 184px;
  /* left: 20px; */
  align-items: center;
}
.rectangle {
  position: absolute;
  background-image: url("/public/Subtract.svg");
  /* background-position: 90%; */
  /* background-size: 99% 90%; */
  /* width: 99.1%; */
  /* height: 72.6vh; */
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
  /* width: 27.7%; */
  /* height: 22.2%; */
  /* left: 5.8%; */
  /* top: 27.5%; */
  width: 95px;
  height: 41px;
  left: 20px;
  top: 48px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Display;
  /* font-size: 11.3vw; */
  font-size: 64px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.37px;
  text-align: left;
}
.label2 {
  position: absolute;
  /* width: 39.7%;
  height: 22.3%;
  left: 5.8%;
  top: 65%; */
  width: 136px;
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
  /* width: 24%;
  height: 9.7%;
  left: 69.2%;
  top: 78.1%; */
  width: 81px;
  height: 18px;
  left: 237px;
  top: 136px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Text;
  /* font-size: 2.71vw; */
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
  /* font-size: 2.71vw; */
  font-size: 13px;
}

.label22 {
  color: white;
  height: 100%;
  text-align: left;
  /* font-size: 3.55vw; */
  font-size: 17px;
}
.image {
  position: absolute;
  /* width: 46.7%;
  height: 86.9%;
  left: 52%; */
  width: 160px;
  height: 160px;
  left: 175px;
  top: -30px;
  /* background-image: url("/public/MoonCloudFastWind.svg"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
