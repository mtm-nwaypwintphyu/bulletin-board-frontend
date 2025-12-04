<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card w-100 mt-5 card-max-500 rounded-4">
      <HeaderRow title="Forgot Password?" />
      <form @submit.prevent="handleForgotPassword">

        <div class="form-group px-3 my-3">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
          />
          <small v-if="email_error" class="error-box text-danger">{{ email_error }}</small>
        </div>

        <div class="row d-flex justify-content-end align-items-center">
          <div class="d-flex col-6 justify-content-end">
            <button
              type="submit"
              class="btn btn-sm btn-custom-blue-dark m-3 px-3"
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Loading :show="passwordStore.loading" />
</template>
<script setup>
import HeaderRow from '~/components/HeaderRow.vue';
import { usePasswordStore } from '#imports';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from '~/components/Loading.vue';

const passwordStore = usePasswordStore();
const toast = useToast();
const email = ref('');
const email_error = ref('');

const handleForgotPassword = async () => {
  email_error.value = '';
  
  if (!email.value) {
    email_error.value = 'Email field is required!';
    return;
  }

  try {
    const response = await passwordStore.forgot(email.value);

    if (response.success) {
      toast.success(response.message || 'Password reset link sent successfully!');
      navigateTo('/login');
      return;
    }

    if (response.errors && response.errors['email']) {
      email_error.value = response.errors['email'][0];
    }

  } catch (err) {
    email_error.value = 'An unexpected error occurred. Please try again later.';
  }
};

definePageMeta({
  layout: 'empty',
});

</script>

<style scoped>

</style>
