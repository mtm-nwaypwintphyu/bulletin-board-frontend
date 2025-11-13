<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Register Confirm" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="username" class= " w-25">Name</label>
          <input disabled type="text" id="username" v-model="username"  class="form-control" />
        </div>
        
        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="email" class= " w-25">Email Address</label>
          <input disabled type="text" id="email" v-model="email"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="password" class= " w-25">Password</label>
          <input disabled type="password" id="password" v-model="password"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="password_confirmation" class= " w-25">Password Confirmation</label>
          <input disabled type="password" id="password_confirmation" v-model="password_confirmation"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="type" class="w-25">Type</label>
          <select name="type" class="form-control" id="type" disabled>
            <option value="0">Admin</option>
            <option value="1">User</option>
          </select>
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="phone" class="w-25">Phone</label>
          <input disabled type="phone" id="phone" v-model="phone"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="dob" class="w-25">Date of Birth</label>
          <input disabled type="date" id="dob" v-model="dob"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="address" class="w-25">Address</label>
          <input disabled type="text" id="address" v-model="address"   class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="profile" class= " w-25">Profile</label>
          <img src="" alt="photo">
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Confirm</button>
            <button type="reset" class="btn btn-sm btn-custom-red m-1 p-2" @click="goToRegister">Cancel</button>
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
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const phone = ref('');
const dob = ref('');
const address = ref('');
const router = useRouter();

function goToRegister() {
  router.push('/admin/create-user')
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
