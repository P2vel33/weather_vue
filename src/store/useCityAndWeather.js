import { defineStore } from "pinia";
import { ref } from "vue";
import dataCity from "../data/dataCity";
import dataNewWeather from "../data/dataNewWeather";

export const useCityAndWeather = defineStore("cityAndWeather", () => {
  const dataCities = ref(dataCity);
  const newDataWeather = ref(dataNewWeather);

  const addDataNewWeather = (value) => {
    newDataWeather.value.unshift(value);
  };

  const addDataCity = (value) => {
    dataCities.value.unshift(value);
  };
  return { dataCities, newDataWeather, addDataNewWeather, addDataCity };
});
