<template>
  <div class="container-fluid d-flex justify-content-center align-items-start p-4">
    <div class="card my-3 w-100 mx-auto card-custom d-flex flex-column rounded-4 bg-white shadow-lg">
      <div class="flex-shrink-0">
        <HeaderRow title="Post List" />
      </div>

      <div class="mt-3 px-3 d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0">

        <form @submit.prevent="handleSearch" method="POST" class="d-flex w-100 w-md-50 mb-2 mb-md-0 me-md-2">
          <input type="text" v-model="searchQuery" class="form-control me-2"
            placeholder="Search by title or description..." />
          <button type="submit" class="btn btn-sm text-white bg-custom-soft-orange">Search</button>
        </form>
        <div class="d-flex w-100 w-md-50 justify-content-start justify-content-md-end">
          <nuxt-link to="/post/create"
            class="btn btn-sm text-white bg-custom-soft-green d-flex align-items-center justify-content-center">
            Create
            <Icon name="material-symbols:add" class="fs-5 ms-2" />
          </nuxt-link>
          <nuxt-link to="/post/upload"
            class="btn btn-sm text-white mx-1 bg-custom-soft-purple d-flex align-items-center justify-content-center">
            Upload
            <Icon name="material-symbols:upload" class="fs-5 ms-2" />
          </nuxt-link>
          <button @click="downloadPost"
            class="d-flex btn btn-sm bg-custom-soft-yellow align-items-center justify-content-center">
            Download
            <Icon name="material-symbols:download" class="fs-5 ms-2" />
          </button>
          <button @click="navigateTo('/user/post-import-history')"
            class="d-flex btn btn-sm bg-custom-blue ms-1 align-items-center justify-content-center">
            Import History
            <Icon name="material-symbols:history" class="fs-5 ms-2" />
          </button>
        </div>
      </div>

      <div class="posts-table-wrapper px-3 flex-grow-1 mt-3">
        <table class="table table-striped table-hover text-nowrap align-middle">
          <thead>
            <tr class="bg-light">
              <th>No.</th>
              <th scope="col">Post Title</th>
              <th scope="col">Post Description</th>
              <th scope="col">Status</th>
              <th scope="col">Posted User</th>
              <th scope="col">Posted Date</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody v-if="!postStore.loading">
            <tr v-if="!posts.length">
              <td colspan="11" class="text-center py-3">There is no data.</td>
            </tr>
            <tr v-for="(post, index) in posts" :key="post.id" @click="showPostDetail(post)" class="clickable">
              <th scope="row"> {{ index + 1 + (currentPage - 1) * perPage }}. </th>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.status == 1 ? "Active" : "Inactive" }}</td>
              <td>{{ post.creator.name }}</td>
              <td>{{ formatDate(post.created_at) }}</td>
              <td>
                <button @click.stop="openConfirmModal(post)" class="btn btn-custom-red btn-sm me-1">Delete</button>
                <button @click.stop="toEditPost(post)" class="btn btn-custom-blue btn-sm text-white">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ConfirmModal :isVisible="showDeleteModal" title="Delete Confirm"
      :message="auth.user.type == 1 ? 'Are you sure to delete this post?' : 'Are you sure to inactivate this post status?'"
      :data="postDetail" @confirm="handleDelete" @cancel="closeModal" />
    <DetailModal :isVisible="showDetailModal" title="Post Detail" :data="postDetail" @cancel="closeModal" />
  </div>
  <Pagination :current-page="currentPage" :total-pages="totalPages" @updatePage="handlePageChange" />
  <Loading :show="postStore.loading" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import { useUserStore } from '~/stores/Admin/userStore';
import ConfirmModal from '~/components/PostConfirmModal.vue';
import DetailModal from '~/components/PostDetailModal.vue';
import { usePostStore } from '#imports';
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';
import Loading from '~/components/Loading.vue';
import Pagination from '~/components/Pagination.vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const postStore = usePostStore();
const auth = useAuthStore();
const router = useRouter();
const searchQuery = ref('');
const toast = useToast();
const showDeleteModal = ref(false);
const showDetailModal = ref(false);

const userStore = useUserStore();

const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 7;
const postDetail = ref(null);
const posts = ref([]);

const postToDelete = ref(null);

onMounted(() => {
  getAllPosts(currentPage.value)
})

const handleSearch = () => {
  currentPage.value = 1;
  getAllPosts(currentPage.value);
}

const formatDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD') : ''
}

const getAllPosts = async (page = 1) => {
  const params = {
    search: searchQuery.value,
    per_page: perPage,
    page
  }

  const response = await postStore.fetchAllPosts(params);
  posts.value = response.data.data;
  currentPage.value = response.data.current_page;
  totalPages.value = response.data.last_page;
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getAllPosts(currentPage.value);
};

function openConfirmModal(post) {
  postDetail.value = post;
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

function handleDelete(post) {
  confirmDeletePost(post.id)
  getAllPosts(currentPage.value);
  closeModal();
}

const confirmDeletePost = async (id) => {
  const response = await postStore.delete(id);

  if (postStore.error) {
    toast(postStore.error)
  } else if (response && response.success) {
    toast(response.message);
    getAllPosts(currentPage.value)
  }
}

const toEditPost = (post) => {
  router.push({ name: 'post-edit', query: { id: post.id } })
}

const downloadPost = async () => {
  try {
    const response = await postStore.fetchAllPosts({ search: searchQuery.value, per_page: 100000 });
    const allPosts = response.data.data;

    if (!allPosts.length) {
      toast("No posts available to download.");
      return;
    }

    const headers = ["ID.", "Post Title", "Post Description", "Status", "Create User Id", "Updated User Id", "Deleted User ID", "Deleted at", "Created at", "Updated at"];

    const rows = allPosts.map((post, index) => [
      index + 1,
      post.title,
      post.description,
      post.status == 1 ? "Active" : "Inactive",
      post.create_user_id,
      post.updated_user_id,
      post.deleted_user_id,
      post.deleted_at,
      formatDate(post.created_at),
      formatDate(post.updated_at)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "posts.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error("Error downloading posts:", error);
    toast("Failed to download posts. Please try again.");
  }
};

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
