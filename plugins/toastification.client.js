import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: "top-center",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    toastClassName: "toast-wrapper",
    icon: false
  };
  nuxtApp.vueApp.use(Toast, options);
});
