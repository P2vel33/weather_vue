<script setup></script>

<template>
  <div class="right-panel">
    <div class="weather-element">1</div>
    <div class="weather-element">2</div>
    <div class="weather-element">3</div>
    <div class="weather-element">4</div>
    <div class="weather-element">5</div>
    <div class="weather-element">6</div>
    <div class="weather-element">7</div>
    <div class="weather-element">8</div>
    <div class="weather-element">9</div>
  </div>
</template>

<style scoped>
.right-panel {
  margin-top: 10%;
  width: 100%;
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr 1fr 1fr;
  column-gap: 10%;
  row-gap: 25%;
  justify-items: stretch;
  align-items: start;
}

.weather-element {
  color: white;
  /* width: 100%; */
  /* height: 100%; */
  font-size: 90px;
  border: 3px solid white;
  border-radius: 25px;
  box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
}
</style>
