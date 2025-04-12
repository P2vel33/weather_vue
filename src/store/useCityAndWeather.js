import { defineStore } from "pinia";
import { ref } from "vue";
import dataCity from "../data/dataCity";
import dataNewWeather from "../data/dataNewWeather";

export const useCityAndWeather = defineStore("cityAndWeather", () => {
  const dataCities = ref(dataCity);
  const newDataWeather = ref(dataNewWeather);
  const weather = ref(newDataWeather.value[0]);
  const currentItemWeather = ref(newDataWeather.value[0].list[0]);
  const weatherCity = ref(dataCities.value[0][0].name);
  const changeCurrentItemWeather = (value) => {
    currentItemWeather.value = value;
  };

  const setWeather = (value) => {
    weather.value = value;
    currentItemWeather.value = value.list[0];
  };
  const setCityName = (value) => {
    weatherCity.value = value;
    console.log(weatherCity.value);
  };

  const addDataNewWeather = (value) => {
    newDataWeather.value.unshift(value);
  };

  const addDataCity = (value) => {
    dataCities.value.unshift(value);
  };

  const setWeatherValues = (dataOfWeather, dataOfCity) => {
    setWeather(dataOfWeather);
    setCityName(dataOfCity[0].name);
    addDataNewWeather(dataOfWeather);
    addDataCity(dataOfCity);
  };
  return {
    dataCities,
    newDataWeather,
    weather,
    currentItemWeather,
    weatherCity,
    addDataNewWeather,
    addDataCity,
    changeCurrentItemWeather,
    setWeather,
    setCityName,
    setWeatherValues,
  };
});
