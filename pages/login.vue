<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card w-100 mt-5 card-max-500 rounded-4">
      <HeaderRow title="Login" />
      <form @submit.prevent="handleLogin">
        <!-- Email Field-->
        <div class="form-group px-3 my-4">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" class="form-control" placeholder="Enter your email address." />
        </div>
        <!-- Password  Field-->
        <div class="form-group px-3 my-4">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password." />
        </div>
        <div class="row px-3 my-3">
          <!-- Remeber me checkbox -->
          <div class="form-group d-flex align-items-center">
            <input type="checkbox" id="rememberMe" v-model="rememberMe" class="me-2" />
            <label for="rememberMe">Remember me</label>
          </div>
          <!-- Forgot password button -->
          <div class="d-flex justify-content-end">
            <nuxt-link class="forgot-password" to="/user/forgot-password">Forgotten password?</nuxt-link>
          </div>
        </div>
        <div class="row d-flex justify-content-between align-items-center">
          <!-- Create account -->
          <div class="d-flex ms-3 col-5 align-items-center">
            <a href="#" class="forgot-password" @click.prevent="goToCreateAccount">Create account?</a><Icon name="material-symbols:person-add-rounded" class="fs-5 text-primary" />
          </div>
          <!-- Login -->
          <div class="d-flex col-6 justify-content-end">
            <button type="submit" class="btn btn-sm bg-custom-blue m-3 px-5">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

// Override default layout with empty
definePageMeta({
  layout: 'empty',
});

// navigate to create account page
function goToCreateAccount() {
  navigateTo('/create-account');
}

function handleLogin(){

}
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
