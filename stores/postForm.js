import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostFormStore = defineStore('postForm', () => {
  const form = ref({
    title: '',
    description: '',
    status: true
  });

  function setForm(data) {
    form.value = { ...form.value, ...data};
  }

  function clearForm() {
    form.value = {
      title: '',
      description: '',
      status: true
    };
  }

  return{ form, setForm, clearForm }
})
