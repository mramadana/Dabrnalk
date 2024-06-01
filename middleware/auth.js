
// pinia store
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {

  if (to.path === '/myreservations') {
    return '/myreservations/pending';
  };

    // Store
    const store = useAuthStore();
    const { isLoggedIn } = storeToRefs(store);
  
    // Toast
    const { errorToast } = toastMsg();
  
    // get i18n t
    const nuxtApp = useNuxtApp();
    const t = nuxtApp.vueApp.config.globalProperties.$t;
  
    if (isLoggedIn.value === false && to.meta.middleware == "auth") {

      errorToast(t("validation.requiresAuth"));

      return navigateTo("/")
    }
})