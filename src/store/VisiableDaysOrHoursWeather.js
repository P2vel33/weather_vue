import { defineStore } from "pinia";
import { ref } from "vue";

export const useVisiableDaysOrHoursWeather = defineStore(
  "visiableDaysOrHoursWeather",
  () => {
    const visiableDaysWeather = ref(false);
    const visiableHoursWeather = ref(true);
    const isVisiableDaysWeather = () => {
      visiableDaysWeather.value = true;
      visiableHoursWeather.value = false;
      console.log(visiableDaysWeather.value);
    };
    const isVisiableHoursWeather = () => {
      visiableDaysWeather.value = false;
      visiableHoursWeather.value = true;
      console.log(visiableHoursWeather.value);
    };
    return {
      visiableDaysWeather,
      visiableHoursWeather,
      isVisiableDaysWeather,
      isVisiableHoursWeather,
    };
  }
);
