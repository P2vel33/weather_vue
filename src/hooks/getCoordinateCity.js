import { ref } from "vue";
import dataCity from "../data/dataCity";
const cityAndCountry = ref({});
const api_key = import.meta.env.VITE_API_KEY;
const lat = ref(0);
const lon = ref(0);

export default function getCoordinateCity(city) {
  (async function gets(params) {
    try {
      // const res = await fetch(
      //   `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=${api_key}`
      // );
      // const response = await res.json();
      const response = dataCity[0];
      lat.value = response[0].lat;
      lon.value = response[0].lon;
      cityAndCountry.value = {
        city: response[0].name,
        country: response[0].country,
        state: response[0].state,
      };
    } catch (error) {
      console.log(error);
    }
  })();

  return { lat, lon, cityAndCountry };
}
