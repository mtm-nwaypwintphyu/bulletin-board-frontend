<template>
  <div class="container-fluid d-flex justify-content-center align-items-start p-4">
    <div class="card my-3 w-100 mx-auto card-custom d-flex flex-column rounded-4 bg-white shadow-lg">
      <div class="flex-shrink-0">
        <HeaderRow title="User List" />
        
        <div class="mt-3 px-3 d-flex justify-content-between align-items-center">
          <form @submit.prevent="handleSearch" class="d-flex flex-wrap align-items-center">
            <div class="mb-2 mb-md-0 d-flex align-items-center me-3">
              <label for="name" class="me-2">Name:</label>
              <input type="text" id="name" v-model="searchName" class="form-control" placeholder="Name">
            </div>
            <div class="mb-2 mb-md-0 d-flex align-items-center me-3">
              <label for="email" class="me-2">Email:</label>
              <input type="text" id="email" v-model="searchEmail" class="form-control" placeholder="Email">
            </div>
            
            <div class="mb-2 mb-md-0 d-flex align-items-center me-3">
              <label for="from" class="me-2">From:</label>
              <input type="date" id="from" v-model="searchFrom" class="form-control" placeholder="From">
            </div>
            <div class="mb-2 mb-md-0 d-flex align-items-center me-3">
              <label for="to" class="me-2">To:</label>
              <input type="date" id="to" v-model="searchTo" class="form-control" placeholder="To">
            </div>
            <button type="submit" class="btn bg-custom-soft-orange text-light">Search</button>
          </form>
          <div class="row col-2 justify-content-between mx-3">
            <button class="col-6 btn-custom-blue btn" @click="navigateTo('/user/post-history')">Post History</button>
            <button v-if="isAdmin" @click="openUploadModal" class="col-5 btn bg-custom-soft-green"><Icon name="material-symbols:upload" class="fs-5" /></button>
          </div>
        </div>
      </div>
      <div class="users-table-wrapper px-3 flex-grow-1">
        <table class="table table-hover table-striped text-nowrap align-middle">
          <thead>
            <tr class="bg-light">
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created User</th>
              <th scope="col">Type</th>
              <th scope="col">Phone</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Address</th>
              <th scope="col">Created Date</th>
              <th scope="col">Updated Date</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody  v-if="!userStore.loading">
              <tr v-if="!users.length"><td colspan="11" class="text-center py-3">There is no data.</td></tr>
              <tr v-for="(user,index) in users" :key="user.id" @click="showUserDetailModal(user)" class="clickable">
              <th scope="row">{{ index + 1 + (currentPage - 1) * perPage }}.</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.creator.name }}</td>
              <td>{{ user.type == 0 ? 'Admin' : 'User' }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.dob }}</td>
              <td>{{ user.address }}</td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>{{ formatDate(user.updated_at) }}</td>
              <td>
                <button @click.stop="openConfirmModal(user)" class="btn btn-custom-red btn-sm me-1">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ConfirmModal
      :isVisible="showDeleteModal"
      title="Delete Confirm"
      message="Are you sure you want to delete this user?"
      :data="userDetail"
      @confirm="handleDelete"
      @cancel="closeModal"
    />

    <DetailModal
      :isVisible="showDetailModal"
      title="User Detail"
      :data="userDetail"
      @cancel="closeModal"
    />
    <UploadCsvModal
      :isVisible="showUploadModal"
      title="CSV Upload"
      @cancel="closeModal"
      @download="handleCsvTemplateDownload"
      @upload="handleCsvUpload"
    />
  </div>
  <Pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @updatePage="handlePageChange"
  />
  <Loading :show="userStore.loading"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import DetailModal from '~/components/UserDetailModal.vue';
import UploadCsvModal from '~/components/UploadCsvModal.vue';
import ConfirmModal from '~/components/UserConfirmModal.vue';
import Pagination from '~/components/Pagination.vue';
import Loading from '~/components/Loading.vue';
import dayjs from 'dayjs';
import { useUserStore } from '~/stores/Admin/userStore';
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const auth = useAuthStore();
const toast = useToast();

const searchName = ref('');
const searchEmail = ref('');
const searchFrom = ref('');
const searchTo = ref('');
const users = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 7;
const isAdmin = auth.user.type == 0;


onMounted(()=>{
  getAllUsers(currentPage.value);
})

const getAllUsers = async(page = 1) => {
  const searchQuery = createSearchQuery();
  const params = {
    per_page: perPage,
    page,
    search: searchQuery
  }
  const response = await userStore.fetchAllUsers(params);
  users.value = response.data.data;
  currentPage.value = response.data.current_page;
  totalPages.value = response.data.last_page;
}

const formatDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD'): ''
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getAllUsers(currentPage.value);
};

// combine all search types
const createSearchQuery = () => {
  const queryParts = [];

  if (searchName.value) queryParts.push(`name:${searchName.value}`);
  if (searchEmail.value) queryParts.push(`email:${searchEmail.value}`);
  if (searchFrom.value) queryParts.push(`from:${searchFrom.value}`);
  if (searchTo.value) queryParts.push(`to:${searchTo.value}`);

  return queryParts.join('&');
}
const handleSearch = () => {
  currentPage.value = 1;
  getAllUsers(currentPage.value);
}

const userDetail = ref(null); 
const showDetailModal = ref(false); 
const showDeleteModal = ref(false); 
const showUploadModal = ref(false);

function showUserDetailModal(user) {
  showDetailModal.value = true;
  userDetail.value = user;
}

function openConfirmModal(user) {
  showDeleteModal.value = true;
  userDetail.value = user;
}

function handleDelete(user){
  confirmDeleteUser(user.id)
  getAllUsers(currentPage.value);
  closeModal();
}

const confirmDeleteUser = async ($id) => {
  const response = await userStore.delete($id);

  if (userStore.error) {
    toast(userStore.error)
  } else if (response && response.success) {
    toast(response.message);
  }
}

function closeModal() {
  showDetailModal.value = false;
  showDeleteModal.value = false;
  showUploadModal.value = false;
  userDetail.value = null;
}

// show upload modal
const openUploadModal = () => {
  console.log("hello")
  showUploadModal.value = true
}

const handleCsvTemplateDownload = () => {
  const headers = [
    'name',
    'email',
    'phone',
    'address',
    'dob'
  ]

  const rows = [
    ['Sample 01', 'sample01@mail.com', '0123456789', '123 Sample Address', '1990-01-01'],
    ['Sample 03', 'sample03@mail.com', '0987654321', '456 Sample Address', '1992-05-10']
  ]

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'user_import_template.csv'
  link.click()
  URL.removeObjectURL(link.href)
}

const handleCsvUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await userStore.uploadCsv(formData);
  if (userStore.error) {
    toast(userStore.error.message)
  } else if (response?.success) {
    toast(response.message)
  }
}

</script>

<style scoped>
.card-custom {
  max-width: 1400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 183px);
}

.users-table-wrapper {
  flex-grow: 1; 
  overflow-y: auto;
  margin-top: 20px;
}
</style>
