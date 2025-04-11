import { defineStore } from "pinia";
// import dataCity from '../data/dataCity';
import dataNewWeather from "../data/dataNewWeather";
import { ref } from "vue";
import dataCity from "../data/dataCity";
import dataNewWeather from "../data/dataNewWeather";

export const useCityAndWeather = defineStore("cityAndWeather", () => {
  const dataCity = ref(dataCity);
  const dataNewWeather = ref(dataNewWeather);

  const addDataNewWeather = () => {
    dataNewWeather.value.push;
  };

  const addDataCity = (value) => {
    dataCity.value.unshift(value);
  };
  return {};
});
