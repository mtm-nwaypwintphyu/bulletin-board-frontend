<template>
 <div class="container mt-5 d-flex justify-content-center">
    <div class="card w-100 mt-5 card-max-500 rounded-4">
      <HeaderRow title="Reset Password" />
      <form @submit.prevent="">

        <div class="form-group px-3 my-3">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required class="form-control" />
        </div>

        <div class="form-group px-3 my-3">
          <label for="password_confirmation">Password Confirmation</label>
          <input type="password" id="password_confirmation" v-model="password_confirmation" required class="form-control" />
        </div>

        <div class="row d-flex justify-content-end align-items-center">
          <div class="d-flex col-6 justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-3 px-3">Update Password</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import HeaderRow from '~/components/HeaderRow.vue';

definePageMeta({
  layout: 'empty',
});

</script>

<style scoped>

</style>
