<template>
  <div class="container mt-3 d-flex justify-content-center">
    <div class="card w-100 card-max-500 rounded-4 mt-5">
      <HeaderRow title="Sign Up" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3">
          <label for="name" class="required-label">Name</label>
          <input type="text" id="name" v-model="name" class="form-control" />
          <small v-if="errors.name" class="error-box">{{ errors.name }}</small>
        </div>
        
        <div class="form-group px-3 my-3">
          <label for="email" class="required-label">Email Address</label>
          <input type="text" id="email" v-model="email" class="form-control" />
          <small v-if="errors.email" class="error-box">{{ errors.email }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="password" class="required-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" />
          <small v-if="errors.password" class="error-box">{{ errors.password }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="password_confirmation" class="required-label">Password Confirmation</label>
          <input type="password" id="password_confirmation" v-model="password_confirmation" class="form-control" />
          <small v-if="errors.password_confirmation" class="error-box">{{ errors.password_confirmation }}</small>
        </div>
        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Create</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 p-2">Clear</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="navigateTo('/login')" class="btn btn-sm btn-custom-blue m-1 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';
import { toRaw } from 'vue'

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

const errors = ref({
  name: '',
  email: '',  
  password: '',
  password_confirmation: '',
})

const handleSubmit = async () => {
  // reset errors
  errors.value = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  // front validation
  if (!name.value.trim()) errors.value.name = 'Name is required!'
  if (!email.value.trim()) errors.value.email = 'Email is required!'
  if (!password.value) errors.value.password = 'Password is required!'
  if (password.value && password.value.length < 6) errors.value.password = 'Password must be at least 6 characters!'
  if (!password_confirmation.value) errors.value.password_confirmation = 'Password confirmation is required!'
  if (password.value && password_confirmation.value && password.value !== password_confirmation.value) {
    errors.value.password_confirmation = 'Passwords do not match!'
  }

  if (Object.values(errors.value).some(e => e)) return

  // user params
  const params = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value,
    password_confirmation: password_confirmation.value
  }

  // call api
  const response = await auth.register(params)

  if (response) {
    toast("User registered successfully!")
    navigateTo('/login')
    return
  }

  // backend errors
  if (auth.error) {
    const backendErrors = toRaw(auth.error)?.errors || {}

    errors.value.name = backendErrors.name?.[0] || ''
    errors.value.email = backendErrors.email?.[0] || ''
    errors.value.password = backendErrors.password?.[0] || ''
    errors.value.password_confirmation = backendErrors.password_confirmation?.[0] || ''

    const toastMessage =
      auth.error.message
        ? auth.error.message + "!"
        : Object.values(backendErrors).flat()[0]?.trim() + "!" || "Something went wrong!"
    toast(toastMessage)
  }
}

definePageMeta({
  layout: 'empty',
});
</script>

<style scoped>
.btn {
  padding: 10px;
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 16px;
}
</style>
