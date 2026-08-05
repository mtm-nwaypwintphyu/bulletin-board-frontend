<template>
  <div class="container d-flex justify-content-center align-items-start m-auto p-4">
    <div class="card my-4 w-100 rounded-4 bg-white shadow-lg mx-auto card-custom d-flex flex-column"> 
      <HeaderRow title="Change Password" />
      <form @submit.prevent="handleChangePassword">
        <div class="form-group px-3 my-3">
          <label for="current_password">Current Password</label>
          <input type="password" id="current_password" v-model="current_password" class="form-control" />
          <small v-if="errors.current_password" class="error-box">{{ errors.current_password }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="new_password">New Password</label>
          <input type="password" id="new_password" v-model="new_password" class="form-control" />
          <small v-if="errors.new_password" class="error-box">{{ errors.new_password }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="new_confirm_password">Confirm New Password</label>
          <input type="password" id="new_confirm_password" v-model="new_confirm_password" class="form-control" />
          <small v-if="errors.new_confirm_password" class="error-box">{{ errors.new_confirm_password }}</small>
        </div>

        <div class="row d-flex justify-content-end align-items-center">
          <div class="d-flex col-12 justify-content-center">
            <a href="#" @click.prevent="navigateTo('/user/edit-profile')" class="btn btn-sm btn-custom-blue m-3 p-2  px-4">Cancel</a>
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-3 px-3">Update Password</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import HeaderRow from '~/components/HeaderRow.vue';
import { usePasswordStore, useAuthStore } from '#imports';

const passwordStore = usePasswordStore();
const auth = useAuthStore();
const toast = useToast();

const current_password = ref('');
const new_password = ref('');
const new_confirm_password = ref('');

const errors = ref({
  current_password: null,
  new_password: null,
  new_confirm_password: null
});

const handleChangePassword = async () => {

  errors.value = {
    current_password: null,
    new_password: null,
    new_confirm_password: null
  };

  if (!current_password.value) {
    errors.value.current_password = 'Current password is required!'
  }
  if (!new_password.value) {
    errors.value.new_password = 'New password is required!'
  } else if (new_password.value.length < 6) {
    errors.value.new_password = 'New password must be at least 6 characters long!'
  }
  if (!new_confirm_password.value) {
    errors.value.new_confirm_password = 'Confirm new password is required!'
  } else if (new_password.value !== new_confirm_password.value) {
    errors.value.new_confirm_password = 'Passwords do not match!'
  }

  if (Object.values(errors.value).some(e => e)) return

  const params = {
    currentPassword: current_password.value,
    newPassword: new_password.value,
  };

  const result = await passwordStore.change(params);
  if (result.success) {
    toast(result.message || 'Password updated successfully!');
    await auth.logout();
    return;
  }

  if (result.errors) {
    errors.value = {
      current_password: result.errors.currentPassword?.[0] || null,
      new_password: result.errors.newPassword?.[0] || null,
      new_confirm_password: null
    };
  }
};
</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 200px);
}
</style>
