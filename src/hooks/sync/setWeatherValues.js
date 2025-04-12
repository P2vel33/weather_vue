import { useCityAndWeather } from "../../store/useCityAndWeather";
import { setCityName } from "./setCityName";
import { setWeather } from "./setWeather";

// const cityAndWeather = useCityAndWeather();

export default function setWeatherValues(
  paramWeather,
  paramCurrentWeather,
  paramCity,
  dataOfWeather,
  dataOfCity,
  addDataNewWeather,
  addDataCity
) {
  setWeather(paramWeather, paramCurrentWeather, dataOfWeather);
  setCityName(paramCity, dataOfCity[0].name);
  addDataNewWeather(dataOfWeather);
  addDataCity(dataOfCity);
}
