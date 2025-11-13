<template>
  <div class="container-fluid d-flex justify-content-center align-items-start p-4">
    <div class="card my-3 w-100 mx-auto card-custom d-flex flex-column rounded-4 bg-white shadow-lg">
      <div class="flex-shrink-0">
        <HeaderRow title="Post List" />
      </div>

      <div class="mt-3 px-3 d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0">
        
        <form action="" method="POST" class="d-flex w-100 w-md-50 mb-2 mb-md-0 me-md-2">
          <input type="text" v-model="searchQuery" class="form-control me-2" placeholder="Search title or user..." />
          <button type="submit" class="btn btn-sm text-white bg-custom-soft-orange">Search</button>
        </form>

        <div class="d-flex w-100 w-md-50 justify-content-start justify-content-md-end">
          <nuxt-link to="/post/create" class="btn btn-sm text-white mx-1 bg-custom-soft-green">
            Create
          </nuxt-link>
          <nuxt-link to="/post/upload" class="btn btn-sm text-white mx-1 bg-custom-soft-yellow">
            Upload
          </nuxt-link>
          <button class="btn btn-sm text-white mx-1 bg-custom-soft-purple">Download</button>
        </div>
      </div>

      <div class="posts-table-wrapper px-3 flex-grow-1 mt-3">
        <table class="table table-striped table-hover text-nowrap align-middle">
          <thead>
            <tr class="bg-light">
              <th scope="col">Post Title</th>
              <th scope="col">Post Description</th>
              <th scope="col">Posted User</th>
              <th scope="col">Posted Date</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" @click="showPostDetail(post)" class="clickable">
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.user }}</td>
              <td>{{ post.date }}</td>
              <td>
                <button @click.stop="openConfirmModal(post)" class="btn btn-custom-red btn-sm me-1">Delete</button>
                <button @click.stop="showPostDetail(post)" class="btn btn-custom-blue btn-sm text-white">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ConfirmModal
      :isVisible="showDeleteModal"
      title="Delete Confirm"
      message="Are you sure you want to delete this post?"
      :data="postToDelete"
      @confirm="handleDelete"
      @cancel="closeModal"
    />
    <DetailModal
      :isVisible="showDetailModal"
      title="Post Detail"
      :data="postDetail"
      @cancel="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import ConfirmModal from '~/components/PostConfirmModal.vue';
import DetailModal from '~/components/PostDetailModal.vue';

const searchQuery = ref('');
const showDeleteModal = ref(false);
const showDetailModal = ref(false);

const posts = ref([
  { 
    id: 1,
    title: 'Sample Post 1',
    description: 'This is a description for post 1.',
    user: 'User1',
    date: '2025-11-10',
    status: 1
  },
  {
    id: 2,
    title: 'Sample Post 2',
    description: 'This is a description for post 2.',
    user: 'User2',
    date: '2025-11-11',
    status: 0
  }
]);

const postToDelete = ref(null);
const postDetail = ref(null);

function openConfirmModal(post) {
  postToDelete.value = post;
  showDeleteModal.value = true;
}

function showPostDetail(post) {
  postDetail.value = post;
  showDetailModal.value = true;
}

function closeModal() {
  showDeleteModal.value = false;
  showDetailModal.value = false;
}

function handleDelete() {
  console.log('Post deleted:', postToDelete.value);
  closeModal();
}

</script>

<style scoped>

.card-custom {
  max-width: 1300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 183px); 
}

.posts-table-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 20px;
}
</style>