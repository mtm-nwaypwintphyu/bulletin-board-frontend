<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Register Confirm" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="name" class= " w-300">Name</label>
          <input disabled type="text" id="name" v-model="name"  class="form-control" />
        </div>
        
        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="email" class= " w-300">Email Address</label>
          <input disabled type="text" id="email" v-model="email"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="password" class= " w-300">Password</label>
          <input disabled type="password" id="password" v-model="password"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="password_confirmation" class= " w-300">Password Confirmation</label>
          <input disabled type="password" id="password_confirmation" v-model="password_confirmation"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="type" class="w-300">Type</label>
          <select name="type" class="form-control" id="type" disabled>
            <option value="0">Admin</option>
            <option value="1">User</option>
          </select>
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="phone" class="w-300">Phone</label>
          <input disabled type="phone" id="phone" v-model="phone"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="dob" class="w-300">Date of Birth</label>
          <input disabled type="date" id="dob" v-model="dob"  class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="address" class="w-300">Address</label>
          <input disabled type="text" id="address" v-model="address"   class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="profile" class="w-300">Profile Photo</label>
          <div v-if="userForm.form.profile" class="d-flex">
            <img :src="profile" alt="Profile Photo" class="img-thumbnail" style="max-width: 150px; max-height: 150px; object-fit: cover;" />
          </div>
          <div v-else>
            <span>No photo uploaded</span>
          </div>
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Confirm</button>
            <button type="reset" class="btn btn-sm btn-custom-red m-1 p-2" @click.prevent="navigateTo('/admin/create-user')">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import HeaderRow from '~/components/HeaderRow.vue';
import { useUserFormStore } from '#imports';
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';

const toast = useToast();
const auth = useAuthStore();
const userForm = useUserFormStore();

const name = userForm.form.name;
const email = userForm.form.email;
const password = userForm.form.password;
const password_confirmation = userForm.form.password_confirmation;
const phone = userForm.form.phone;
const dob = userForm.form.dob;
const address = userForm.form.address;
const profile = userForm.form.profile;
const type= userForm.form.type;
const current_user_id = auth.user.id

const params = {
  current_user_id,
  name,
  email,
  password,
  password_confirmation,
  phone,
  dob,
  type,
  address,
  profile
};

const handleSubmit = async () => {
  const response = await auth.register(params)
  if (auth.error) {
    const backendErrors = toRaw(auth.error)?.errors || {};

    const errorMessages = Object.values(backendErrors)
      .flat()
      .map(msg => msg.trim());

    const toastMessage = errorMessages.length
      ? errorMessages[0] + "!"
      : auth.error.message
        ? auth.error.message + "!"
        : "Something went wrong!";

    toast(toastMessage);
  } else if (response && response.success) {
    toast("User registered successfully.");
    userForm.clearForm()
    navigateTo('/user');
  }
}
</script>
<style scoped>
.container{
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 780px;
}
</style>
