<template>
  <div class="container d-flex justify-content-center mx-auto my-4">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Create Post" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3">
          <label for="title">Title</label>
          <input type="text" id="title" disabled v-model="title" required class="form-control" />
        </div>

        <div class="form-group px-3 my-3">
          <label for="description">Description</label>
          <textarea name="" id="" class="form-control" rows="8" disabled v-model="description"></textarea>
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Confirm</button>
            <button @click.prevent="goToCreate" class="btn btn-sm btn-custom-red clear-btn m-1 p-2">Cancel</button>
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

const title = ref('');
const description = ref('');

const router = useRouter();

function goToCreate() {
  router.push('/post/create');
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 504px;
}
</style>
