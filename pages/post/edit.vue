<template>
  <div class="container d-flex justify-content-center mx-auto my-4">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Edit Post" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3">
          <label class="required-label" for="title">Title</label>
          <input type="text" id="title" v-model="postForm.form.title" class="form-control" :disabled="auth.user.type == 0"/>
          <small v-if="errors.title" class="error-box">{{ errors.title }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label class="required-label" for="description">Description</label>
          <textarea name="" id="" class="form-control" rows="6" v-model="postForm.form.description" :disabled="auth.user.type == 0"></textarea>
          <small v-if="errors.description" class="error-box">{{ errors.description }}</small>
        </div>

        <div class="form-group px-3 my-3">
          <label for="status" class="me-2">Status</label>
          <label class="switch" :class="{ 'switch-disabled': auth.user.type == 1 }">
            <input type="checkbox" v-model="postForm.form.status" :disabled="auth.user.type == 1" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2 px-3">Edit</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 p-2" v-show="auth.user.type == 1">Clear</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="navigateTo('/')" class="btn btn-sm btn-custom-blue m-1 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Loading :show="postStore.loading" />
</template>

<script setup>
import { onMounted } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import Loading from '~/components/Loading.vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '#imports';
import { usePostFormStore } from '#imports';
import { useAuthStore } from '#imports';

const route = useRoute();
const postForm = usePostFormStore();
const postStore = usePostStore();
const auth = useAuthStore();

const errors = reactive({
  title: '',
  description: ''
})

onMounted(async () => {
  const postId = route.query.id;
  const response = await postStore.fetchPostDetail(postId);
  const data = response.data;

  if (data) {
    postForm.form.id = postId;
    postForm.form.title = data.title;
    postForm.form.description = data.description;
    postForm.form.status = data.status === 1;
  }
})

const handleSubmit = async() => {
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!postForm.form.title) errors.title = 'Title is required!'
  if (!postForm.form.description) errors.description = 'Description is required!'

  if (Object.values(errors).some(e => e)) return
  const param = { ...postForm.form };
  postForm.setForm(param)
  navigateTo('/post/edit-confirm')
}
</script>

<style scoped>
.container{
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 504px;
}
</style>
