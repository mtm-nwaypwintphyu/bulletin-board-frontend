<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Upload CSV File" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-4">
          <label for="username">CSV File</label>
          <input type="file" id="username" required class="form-control" />
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-1 p-2">Upload</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 p-2">Clear</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="navigateTo('/')" class="btn btn-sm btn-custom-blue m-1 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import HeaderRow from '~/components/HeaderRow.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToPost() {
  router.push('/post');
}
</script>

<style scoped>
.container{
  min-height: calc(100vh - 135px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 300px;

}
</style>
