import dataCity from "../../data/dataCity";

const api_key = import.meta.env.VITE_API_KEY;

export default async function getCityByCoordinate(
  staticData,
  latitude,
  longitude
) {
  try {
    let response = null;
    if (staticData) {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
      );
      response = await res.json();
    } else {
      response = dataCity[1];
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}
