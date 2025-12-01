import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostFormStore = defineStore('postForm', () => {
  const form = ref({
    title: '',
    description: '',
    status: 1
  });

  function setForm(data) {
    form.value = { ...form.value, ...data};
  }

  function clearForm() {
    form.value = {
      title: '',
      description: '',
      status: 1
    };
  }

  return{ form, setForm, clearForm }
})
