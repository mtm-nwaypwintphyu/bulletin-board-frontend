<template>
  <div class="container-fluid d-flex justify-content-center align-items-start p-4">
    <div class="card my-3 w-100 mx-auto card-custom d-flex flex-column rounded-4 bg-white shadow-lg">
      <div class="flex-shrink-0">
        <HeaderRow title="User List" />
        
        <div class="mt-3 px-3 d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-end ms-auto">
            <button class="btn-custom-blue btn" @click="navigateTo('/user/post-history')">Post History</button>
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
              <tr v-if="!users.length"><td colspan="10" class="text-center py-3">There is no data.</td></tr>
              <tr v-for="(user,index) in users" :key="user.id" @click="showUserDetailModal(user)" class="clickable">
              <th scope="row">{{ index + 1 + (currentPage - 1) * perPage }}.</th>
              <td>{{ user?.name }}</td>
              <td>{{ user?.email }}</td>
              <td>{{ user?.type === 'ADMIN' ? 'Admin' : 'User' }}</td>
              <td>{{ user?.phone }}</td>
              <td>{{ formatDate(user?.dob) }}</td>
              <td>{{ user?.address }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>{{ formatDate(user.updatedAt) }}</td>
              <td>
                <button @click.stop="toEditUser(user)" class="btn btn-custom-blue btn-sm text-white me-1">
                  Edit
                </button>
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
import ConfirmModal from '~/components/UserConfirmModal.vue';
import Pagination from '~/components/Pagination.vue';
import Loading from '~/components/Loading.vue';
import { useUserStore } from '~/stores/Admin/userStore';
import { useToast } from 'vue-toastification';

const { formatDate } = useFormatDate();
const userStore = useUserStore();
const toast = useToast();

const users = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 7;


onMounted(()=>{
  getAllUsers(currentPage.value);
})

const getAllUsers = async(page = 1) => {
  const params = {
    limit: perPage,
    page,
  }
  const response = await userStore.fetchAllUsers(params);
  if (!response) return;
  const result = response.data;
  users.value = result.users;
  currentPage.value = result.pagination.page;
  totalPages.value = result.pagination.totalPages;
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getAllUsers(currentPage.value);
};

const userDetail = ref(null); 
const showDetailModal = ref(false); 
const showDeleteModal = ref(false); 

function showUserDetailModal(user) {
  showDetailModal.value = true;
  userDetail.value = user;
}

function openConfirmModal(user) {
  showDeleteModal.value = true;
  userDetail.value = user;
}

function toEditUser(user) {
  navigateTo(`/user/edit/${user.id}`);
}

async function handleDelete(user){
  const deleted = await confirmDeleteUser(user.id)
  if (deleted) {
    getAllUsers(currentPage.value);
  }
  closeModal();
}

const confirmDeleteUser = async ($id) => {
  const response = await userStore.delete($id);

  if (userStore.error) {
    toast(userStore.error.message)
    return false
  } else if (response && response.status === 'success') {
    toast(response.data.message || 'User deleted successfully.');
    return true
  }
  return false
}

function closeModal() {
  showDetailModal.value = false;
  showDeleteModal.value = false;
  userDetail.value = null;
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
