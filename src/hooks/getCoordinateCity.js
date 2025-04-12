import { ref } from "vue";
import dataCity from "../data/dataCity";

const api_key = import.meta.env.VITE_API_KEY;

export default async function getCoordinateCity(staticData, cityValue) {
  try {
    let response = null;
    if (staticData) {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${api_key}`
      );
      response = await res.json();
    } else {
      response = dataCity[0];
    }
    const latitude = response[0].lat;
    const longitude = response[0].lon;
    const data = response;
    return { data, latitude, longitude };
  } catch (error) {
    console.log(error);
  }
}
