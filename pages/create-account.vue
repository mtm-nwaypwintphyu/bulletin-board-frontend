<template>
  <div class="container mt-5 d-flex justify-content-center mt-5">
    <div class="card w-100 card-max-500 rounded-4 mt-5">
      <HeaderRow title="Sign Up" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-4">
          <label for="username" class="required-label">Name</label>
          <input type="text" id="username" v-model="username" class="form-control" />
        </div>
        
        <div class="form-group px-3 my-4">
          <label for="email" class="required-label">Email Address</label>
          <input type="text" id="email" v-model="email" class="form-control" />
        </div>

        <div class="form-group px-3 my-4">
          <label for="password" class="required-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" />
        </div>

        <div class="form-group px-3 my-4">
          <label for="password" class="required-label">Password Confirmation</label>
          <input type="password" id="password" v-model="password" class="form-control" />
        </div>
        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Create</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 p-2">Clear</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="goToLogin" class="btn btn-sm btn-custom-blue m-1 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

definePageMeta({
  layout: 'empty',
});

function goToLogin() {
  router.push('/login');
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
