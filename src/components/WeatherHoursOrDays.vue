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
    <div class="image"></div>
    <p class="rain">{{ data.main.humidity }}%</p>
    <p class="temp">{{ temp }}°</p>
  </div>
</template>

<style scoped>
.image {
  /* Moon cloud mid rain (Big/Moon cloud mid rain) */
  position: absolute;
  width: 32px;
  height: 32px;
  left: 14px;
  /* right: 0%; */
  top: 48px;
  /* bottom: 0%; */
  background-image: url("/public/MoonCloudMidRainSmall.svg");
}

.rain {
  /* Default/Bold/Footnote */
  position: absolute;
  left: 18px;
  top: 78px;
  color: rgb(64, 203, 216);
  font-family: SF Pro Text;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.08px;
  text-align: center;
}

.temp {
  /* Default/Regular/Title3 */
  width: 30px;
  height: 24px;
  position: absolute;
  left: 15px;
  top: 106px;
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
  position: absolute;
  width: 43px;
  height: 20px;
  left: 8.5px;
  top: 16px;
  color: rgb(255, 255, 255);
  font-family: SF Pro Text;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;
}

.hour-or-day {
  z-index: 2;
  position: relative;
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
