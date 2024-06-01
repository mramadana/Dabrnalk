import { defineStore } from "pinia";


export const useGlobalStore = defineStore("global", {
  state: () => ({
    testRef: "koooooook"
  }),
  actions: {},
//   persist: {
//     storage: persistedState.cookiesWithOptions({
//       sameSite: "strict",
//     }),
//   },
});
