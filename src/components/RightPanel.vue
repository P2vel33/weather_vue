<script setup></script>

<template>
  <div class="right-panel">
    <div class="weather-element one">1</div>
    <!-- <div class="weather-element">2</div> -->
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
  color: white;
  width: 14vw;
  height: 14vw;
  font-size: 90px;
  border: 3px solid white;
  border-radius: 25px;
  box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
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
