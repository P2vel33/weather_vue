import { ref } from "vue";
import dataWeather from "../data/dataWeather";
import getCoordinateCity from "./getCoordinateCity";
const weather = ref({});
const iconId = ref(0);
const weatherDescription = ref("");

export default function getWeatherCity(city) {
  (async function gets(params) {
    try {
      const { lat, lon } = await getCoordinateCity(city);
      // const res = await fetch(
      // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      // );
      // const response = await res.json();
      const response = dataWeather[0];
      weather.value = response.main;
      iconId.value = response.weather[0].id;
      weatherDescription.value = response.weather[0].description;
      // console.log(weatherDescription.value);
    } catch (error) {
      console.log(error);
    }
  })();

  return {
    weather,
    iconId,
    weatherDescription,
  };
}
