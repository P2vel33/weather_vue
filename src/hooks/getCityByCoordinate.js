import { ref } from "vue";
import dataCity from "../data/dataCity";

const api_key = import.meta.env.VITE_API_KEY;

export default async function getCityByCoordinate(latitude, longitude) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
      // `http://api.openweathermap.org/geo/1.0/direct?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
