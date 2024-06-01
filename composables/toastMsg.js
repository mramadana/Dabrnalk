import { useToast } from "primevue/usetoast";

export default function toastMsg() {
  const nuxtApp = useNuxtApp();
  const getToast = () => nuxtApp.vueApp.config.globalProperties.$toast;

  const toast = getToast();

  // successToast
  const successToast = (msg) => {
    toast.add({ severity: "success", summary: msg, life: 3500 });
  };

  // errorToast
  const errorToast = (msg) => {
    toast.add({ severity: "error", summary: msg, life: 3500 });
  };

  return { successToast, errorToast };
}