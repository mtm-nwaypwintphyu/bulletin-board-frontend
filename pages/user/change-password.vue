<template>
  <div class="container d-flex justify-content-center align-items-start m-auto p-4">
    <div class="card my-4 w-100 rounded-4 bg-white shadow-lg mx-auto card-custom d-flex flex-column"> 
      <HeaderRow title="Change Password" />
      <form @submit.prevent="">
        <div class="form-group px-3 my-3">
          <label for="current_password">Current Password</label>
          <input type="password" id="current_password" v-model="current_password" class="form-control" />
        </div>

        <div class="form-group px-3 my-3">
          <label for="new_password">New Password</label>
          <input type="password" id="new_password" v-model="new_password" class="form-control" />
        </div>

        <div class="form-group px-3 my-3">
          <label for="new_confirm_password">New Confirm Password</label>
          <input type="password" id="new_confirm_password" v-model="new_confirm_password" class="form-control" />
        </div>

        <div class="row d-flex justify-content-end align-items-center">
          <div class="d-flex col-6 justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-3 px-3">Update Password</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="navigateTo('/user/profile')" class="btn btn-sm btn-custom-blue m-3 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import HeaderRow from '~/components/HeaderRow.vue';

</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 200px);
}
</style>
