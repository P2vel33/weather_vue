const dataWeather = {
  coord: { lon: 49.1242, lat: 55.7824 },
  weather: [
    { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" },
  ],
  base: "stations",
  main: {
    temp: 282.55,
    feels_like: 279.74,
    temp_min: 282.55,
    temp_max: 282.55,
    pressure: 1010,
    humidity: 76,
    sea_level: 1010,
    grnd_level: 996,
  },
  visibility: 10000,
  wind: { speed: 5.68, deg: 167, gust: 12.06 },
  clouds: { all: 99 },
  dt: 1744092337,
  sys: {
    type: 1,
    id: 9038,
    country: "RU",
    sunrise: 1744077368,
    sunset: 1744126451,
  },
  timezone: 10800,
  id: 551487,
  name: "Kazan’",
  cod: 200,
};

export default dataWeather;
