
// pinia store
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  

  if (to.path === '/myreservations') {
    return '/myreservations/pending';
  };


    // Store
    const store = useAuthStore();
    const { isLoggedIn, Globaldialog } = storeToRefs(store);
  
    // Toast
    const { errorToast } = toastMsg();
  
    // get i18n t
    const nuxtApp = useNuxtApp();
    const t = nuxtApp.vueApp.config.globalProperties.$t;
  
    if (isLoggedIn.value === false && to.meta.middleware == "auth") {
        Globaldialog.value = true;
        return false;
    //   if (from.path.includes("Auth")) {
    //     return navigateTo("/Auth/login");
    // } else {
    //     return navigateTo("/");
    // }
      

      // errorToast(t("validation.requiresAuth"));
      
      
    }
})