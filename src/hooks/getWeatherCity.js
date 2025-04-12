import dataNewWeather from "../data/dataNewWeather";
const api_key = import.meta.env.VITE_API_KEY;
export default async function getWeatherCity(latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
    );
    const response = await res.json();
    // const response = dataNewWeather[3];
    return response;
  } catch (error) {
    console.log(error);
  }
}
