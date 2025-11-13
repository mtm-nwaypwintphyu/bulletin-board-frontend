<template>
  <div class="container d-flex justify-content-center align-items-start mx-auto p-4">
    <div class="card my-4 w-100 rounded-4 bg-white shadow-lg mx-auto card-custom d-flex flex-column"> 
      <HeaderRow title="Edit Profile" />
      <form @submit.prevent="handleSubmit" class="px-3 py-2">
        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="username" class="required-label w-25">Name</label>
          <input type="text" id="username" v-model="username" class="form-control" />
        </div>
        
        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="email" class="required-label w-25">Email Address</label>
          <input type="text" id="email" v-model="email" class="form-control" />
        </div>

        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="type" class="w-25">Type</label>
          <select name="type" class="form-control" id="type">
            <option value="0">Admin</option>
            <option value="1">User</option>
          </select>
        </div>

        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="phone" class="w-25">Phone</label>
          <input type="phone" id="phone" v-model="phone" class="form-control" />
        </div>

        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="dob" class="w-25">Date of Birth</label>
          <input type="date" id="dob" v-model="dob" class="form-control" />
        </div>

        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="address" class="w-25">Address</label>
          <input type="text" id="address" v-model="address" class="form-control" />
        </div>
        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="profile" class="w-25">Old Profile</label>
          <img src="" alt="photo">
        </div>
        <div class="form-group px-3 my-4 d-flex align-items-center">
          <label for="profile" class="w-25">Profile</label>
          <input type="file" id="profile" class="form-control" />
        </div>

        <div class="row align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end align-items-center">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-1 p-2 col-1">Edit</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 me-3 p-2 col-1">Clear</button>
            <a href="" @click.prevent="navigateTo('/user/change-password')">Change Password</a>
          </div>
          <div class="">
            <a href="#" @click.prevent="navigateTo('/user/profile')" class="btn btn-sm btn-custom-blue p-2 px-4">Back</a>
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
const phone = ref('');
const dob = ref('');
const address = ref('');
</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 151px);
}
</style>
