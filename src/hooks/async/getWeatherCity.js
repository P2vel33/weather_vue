import dataNewWeather from "../../data/dataNewWeather";

const api_key = import.meta.env.VITE_API_KEY;
export default async function getWeatherCity(staticData, latitude, longitude) {
  try {
    let response = null;
    if (staticData) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      response = await res.json();
    } else {
      response = dataNewWeather[1];
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}
