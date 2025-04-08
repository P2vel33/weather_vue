<script setup>
const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const temp = Number(data.main.temp - 271.15).toFixed();
const time = data.dt_txt.slice(-8, -3);
</script>

<template>
  <div class="hour-or-day">
    <p class="time">{{ time }}</p>
    <div class="image-weather-and-humidity">
      <div class="image"></div>
      <p class="rain">{{ data.main.humidity }}%</p>
    </div>
    <p class="temp">{{ temp }}°</p>
  </div>
</template>

<style scoped>
.image {
  /* Moon cloud mid rain (Big/Moon cloud mid rain) */
  width: 32px;
  height: 32px;
  background-image: url("/public/MoonCloudMidRainSmall.svg");
}

.rain {
  /* Default/Bold/Footnote */
  color: rgb(64, 203, 216);
  font-family: SF Pro Text;
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
  font-family: SF Pro Display;
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
  font-family: SF Pro Text;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;
}

.hour-or-day {
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
}
</style>
