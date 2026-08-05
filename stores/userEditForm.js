import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserEditFormStore = defineStore('userEditForm', () => {
  const form = ref({
    id: null,
    name: '',
    type: 'USER',
    phone: '',
    address: '',
    dob: '',
    profile: null,
    oldProfile: null,
  });

  function setForm(data) {
    form.value = { ...form.value, ...data };
  }

  function clearForm() {
    form.value = {
      id: null,
      name: '',
      type: 'USER',
      phone: '',
      address: '',
      dob: '',
      profile: null,
      oldProfile: null,
    };
  }

  function setProfilePhoto(file) {
    form.value.profile = file;
  }

  return { form, setForm, clearForm, setProfilePhoto };
})
