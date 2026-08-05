<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card w-100 mt-5 card-max-500 rounded-4">
      <HeaderRow title="Reset Password" />

      <form @submit.prevent="handleReset">

        <div class="form-group px-3 my-3">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
          />
          <small v-if="password_error" class="text-danger">{{ password_error }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="password_confirmation">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="password_confirmation"
            class="form-control"
          />
          <small v-if="password_confirmation_error" class="text-danger">{{ password_confirmation_error }}</small>
        </div>

        <div class="row d-flex justify-content-end align-items-center">
          <div class="d-flex col-6 justify-content-end">
            <button
              type="submit"
              class="btn btn-sm btn-custom-blue-dark m-3 px-3"
              :disabled="passwordStore.loading"
            >
              Update Password
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>

  <Loading :show="passwordStore.loading" />
</template>

<script setup>
import HeaderRow from '~/components/HeaderRow.vue'
import Loading from '~/components/Loading.vue'
import { ref } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { usePasswordStore } from '#imports'
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const passwordStore = usePasswordStore()
const toast = useToast()

const token = route.query.token || ''
const email = route.query.email || ''

const password = ref('')
const password_confirmation = ref('')
const password_error = ref('')
const password_confirmation_error = ref('')

const handleReset = async () => {
  password_error.value = ''
  password_confirmation_error.value = ''

  if (!password.value) {
    password_error.value = 'Password is required!'
    return
  }
   if (!password_confirmation.value) {
    password_confirmation_error.value = 'Password confirmation is required!'
    return
  }

  if (password.value.length < 6) {
    password_error.value = 'Password must be at least 6 characters!'
    return
  }

  if (password.value !== password_confirmation.value) {
    password_confirmation_error.value = 'Passwords do not match!'
    return
  }

  const payload = {
    email,
    token,
    password: password.value,
    password_confirmation: password_confirmation.value
  }

  const response = await passwordStore.reset(payload)

  if (response.success) {
    toast.success(response.message || 'Password reset successfully!')
    navigateTo('/login')
    return
  }

  if (response.errors) {
    if (response.errors.password) {
      password_error.value = response.errors.password[0]
    }
    if (response.errors.password_confirmation) {
      password_confirmation_error.value = response.errors.password_confirmation[0]
    }
    if (response.errors.token) {
      toast.error(response.errors.token[0])
    }
  }
}
</script>

<style scoped>
</style>
