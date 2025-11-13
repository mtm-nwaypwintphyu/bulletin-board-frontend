import * as bootstrap from 'bootstrap';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('bs', bootstrap);
});