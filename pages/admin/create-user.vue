<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Register" />
      
      <form @submit.prevent="handleSubmit" class="p-3">
        
        <div class="row mb-3 align-items-center">
          <label for="username" class="col-md-3 col-form-label text-md-end required-label">Name</label>
          <div class="col-md-9">
            <input type="text" id="username" v-model="username" class="form-control" />
          </div>
        </div>
        
        <div class="row mb-3 align-items-center">
          <label for="email" class="col-md-3 col-form-label text-md-end required-label">Email Address</label>
          <div class="col-md-9">
            <input type="email" id="email" v-model="email" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="password" class="col-md-3 col-form-label text-md-end required-label">Password</label>
          <div class="col-md-9">
            <input type="password" id="password" v-model="password" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="password_confirmation" class="col-md-3 col-form-label text-md-end required-label">Confirm Password</label>
          <div class="col-md-9">
            <input type="password" id="password_confirmation" v-model="password_confirmation" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="type" class="col-md-3 col-form-label text-md-end">Type</label>
          <div class="col-md-9">
            <select name="type" v-model="type" class="form-select" id="type"> 
              <option value="0">Admin</option>
              <option value="1">User</option>
            </select>
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="phone" class="col-md-3 col-form-label text-md-end">Phone</label>
          <div class="col-md-9">
            <input type="tel" id="phone" v-model="phone" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="dob" class="col-md-3 col-form-label text-md-end">Date of Birth</label>
          <div class="col-md-9">
            <input type="date" id="dob" v-model="dob" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="address" class="col-md-3 col-form-label text-md-end">Address</label>
          <div class="col-md-9">
            <input type="text" id="address" v-model="address" class="form-control" />
          </div>
        </div>

        <div class="row mb-4 align-items-center">
          <label for="profile" class="col-md-3 col-form-label text-md-end required-label">Profile Photo</label>
          <div class="col-md-9">
            <input type="file" id="profile" class="form-control" @change="handleFileUpload"/> 
          </div>
        </div>

        <div class="row justify-content-end mb-3">
          <div class="col-md-9 d-flex justify-content-end">
            <button type="submit" @click="navigateTo('/admin/confirm-create-user')" class="btn btn-custom-blue px-4">Register</button>
            <button type="reset" class="btn btn-custom-red mx-1 ps">Clear</button>
          </div>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const type = ref('1');
const phone = ref('');
const dob = ref('');
const address = ref('');

function handleFileUpload(event) {
}

function handleSubmit() {
    console.log('Form Submitted!');
}
</script>

<style scoped>
.container{
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 660px;
}
</style>