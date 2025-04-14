import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loadingStore", () => {
  const isLoadingMain = ref(false);
  const isLoadingWeatherWidgets = ref(true);
  const setLoadingMain = () => {
    isLoadingMain.value = true;
  };

  const removeLoadingMain = () => {
    isLoadingMain.value = false;
  };

  const setLoadingWeatherWidgets = () => {
    isLoadingWeatherWidgets.value = true;
  };

  const removeLoadingWeatherWidgets = () => {
    isLoadingWeatherWidgets.value = false;
  };

  return {
    isLoadingMain,
    isLoadingWeatherWidgets,
    setLoadingMain,
    removeLoadingMain,
    setLoadingWeatherWidgets,
    removeLoadingWeatherWidgets,
  };
});
