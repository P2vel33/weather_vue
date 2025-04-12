import dataNewWeather from "../../data/dataNewWeather";

const api_key = import.meta.env.VITE_API_KEY;
export default async function getWeatherCity(staticData, latitude, longitude) {
  console.log(staticData);
  try {
    let response = null;
    if (staticData) {
      console.log(latitude, longitude);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      response = await res.json();
    } else {
      response = dataNewWeather[1];
    }
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
