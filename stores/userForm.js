import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserFormStore = defineStore('userForm', () => {
  const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: 1,
    phone: '',
    address: '',
    dob: '',
    profile: null,
  });

  function setForm(data) {
    form.value = { ...form.value, ...data };
  }

  function clearForm() {
    form.value = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      type: 1,
      phone: '',
      address: '',
      dob: '',
      profile: null
    };
  }

  function setProfilePhoto(photoUrl) {
    form.value.profile = photoUrl;
  }

  return { form, setForm, clearForm, setProfilePhoto };
})
