<template>
  <div class="container-fluid d-flex justify-content-center align-items-start p-4">
    <div class="card my-3 w-100 mx-auto card-custom d-flex flex-column rounded-4 bg-white shadow-lg">
      <div class="flex-shrink-0"> 
        <HeaderRow title="Post History" />
      </div>
      <div class="posts-table-wrapper px-3 flex-grow-1 mt-3">
        <table class="table table-striped table-hover text-nowrap align-middle">
          <thead>
            <tr class="bg-light">
              <th>No.</th>
              <th>Post ID</th>
              <th>Post Title</th>
              <th>User Name</th>
              <th>Description</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody v-if="!postStore.loading">
            <tr v-if="!postHistory.length"><td colspan="7" class="text-center py-3">No post history found.</td></tr>
            <tr v-for="(history, index) in postHistory" :key="history.id">
              <th scope="row"> {{ index + 1 + (currentPage-1) * perPage }}. </th>
              <td>{{ history?.post.id }}</td>
              <td>{{ history?.post?.title }}</td>
              <td>{{ history.user.name }}</td>
              <td>{{ history.change_description }}</td>
              <td>{{ formatDate(history.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :isVisible="showDeleteModal"
      title="Delete Confirm"
      :message="'Are you sure to delete this import history record?'"
      :data="historyDetail"
      @confirm="handleDelete"
      @cancel="closeModal"
    />
  </div>

  <!-- Pagination -->
  <Pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @updatePage="handlePageChange"
  />
  
  <!-- Loading Spinner -->
  <Loading :show="postStore.loading" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import ConfirmModal from '~/components/PostHistoryConfirmModal.vue';
import { usePostStore } from '#imports';
import { useToast } from 'vue-toastification';
import Loading from '~/components/Loading.vue';
import Pagination from '~/components/Pagination.vue';
import dayjs from 'dayjs';

const postStore = usePostStore();
const toast = useToast();
const showDeleteModal = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 7;
const historyDetail = ref(null);
const postHistory = ref([]);

onMounted(() => {
  getAllpostHistory(currentPage.value)
  console.log("imp", postHistory.value)
});

const formatDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD') : '';
}

const getAllpostHistory = async (page = 1) => {
  const params = {
    per_page: perPage,
    page
  };

  const response = await postStore.fetchAllPostHistory(params);
  postHistory.value = response.data.data;
  currentPage.value = response.data.current_page;
  totalPages.value = response.data.last_page;
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getAllpostHistory(currentPage.value);
};

function openDeleteModal(history) {
  historyDetail.value = history;
  showDeleteModal.value = true;
}

function closeModal() {
  showDeleteModal.value = false;
}

function handleDelete(history) {
  confirmDeleteHistory(history.id);
  getAllpostHistory(currentPage.value);
  closeModal();
}

const confirmDeleteHistory = async (id) => {
  const response = await postStore.deleteHistory(id);

  if (postStore.error) {
    toast(postStore.error);
  } else if (response && response.success) {
    toast(response.message);
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
