<template>
  <div class="container d-flex justify-content-center mx-auto my-4">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Create Post" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3">
          <label class="required-label" for="title">Title</label>
          <input type="text" id="title"  v-model="postForm.form.title" class="form-control" />
          <small v-if="errors.title" class="error-box">{{ errors.title }}</small>
        </div>
        <div class="form-group px-3 my-3">
          <label class="required-label" for="description">Description</label>
          <textarea name="" id="" rows="6" class="form-control"  v-model="postForm.form.description"></textarea>
          <small v-if="errors.description" class="error-box">{{ errors.description }}</small>
        </div>
        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Create</button>
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
import { usePostFormStore } from '#imports';

const postForm = usePostFormStore();
const errors = reactive({
  title: '',
  description: ''
})

const handleSubmit = () => {
  // reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!postForm.form.title) errors.title = "Post title is required!"
  if (!postForm.form.description) errors.description = "Post description is required!"

  if (Object.values(errors).some(e => e)) return
  // create post form copy
  const params = { ...postForm }
  postForm.setForm(params)
  navigateTo('/post/create-confirm')
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
