import { ref } from "vue";
import dataCity from "../data/dataCity";

const api_key = import.meta.env.VITE_API_KEY;

export default async function getCoordinateCity(cityValue) {
  try {
    // console.log(city);
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${api_key}`
    );
    const response = await res.json();
    // console.log(dataCity);
    // console.log(cityValue);
    // const response = dataCity[3];
    // dataCity.unshift(response[0]);
    const latitude = response[0].lat;
    const longitude = response[0].lon;
    const data = response;
    return { data, latitude, longitude };
  } catch (error) {
    console.log(error);
  }
}
