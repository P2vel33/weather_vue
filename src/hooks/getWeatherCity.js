import { ref } from "vue";
import dataWeather from "../data/dataWeather";
import getCoordinateCity from "./getCoordinateCity";
const weather = ref({});
const iconId = ref(0);

export default function getWeatherCity(city) {
  (async function gets(params) {
    try {
      const { lat, lon } = await getCoordinateCity(city);
      // const res = await fetch(
      // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      // );
      // const response = await res.json();
      const response = dataWeather;
      weather.value = response.main;
      iconId.value = response.weather[0].id;
    } catch (error) {
      console.log(error);
    }
  })();

  return {
    weather,
    iconId,
  };
}
