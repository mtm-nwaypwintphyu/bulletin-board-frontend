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
            <button @click="navigateTo('/user/post-history')" class="ms-5 d-flex btn btn-sm bg-custom-blue ms-1 align-items-center justify-content-center">
              Post History
              <Icon name="material-symbols:history" class="fs-5 ms-2" />
            </button>
          </form>
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
          <tbody>
            <tr v-for="user in users" :key="user.id" @click="showUserDetailModal(user)" class="clickable">
              <th scope="row">{{ index + 1 }}</th> 
              
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.creator }}</td>
              <td>{{ user.type }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.dob }}</td>
              <td>{{ user.address }}</td>
              
              <td>{{ user.created_at }}</td>
              <td>{{ user.updated_at }}</td>
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
  </div>
</template>

<script setup>
import HeaderRow from '~/components/HeaderRow.vue';
import DetailModal from '~/components/UserDetailModal.vue';
import ConfirmModal from '~/components/UserConfirmModal.vue';
import { ref } from 'vue';

const searchName = ref('');
const searchEmail = ref('');
const searchFrom = ref('');
const searchTo = ref('');

function handleSearch() {
  console.log('Searching with:', {
    name: searchName.value,
    email: searchEmail.value,
    from: searchFrom.value,
    to: searchTo.value,
  });
}


const users = ref([
  { 
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    creator: 'Admin',
    type: 'Member',
    phone: '123-456-7890',
    dob: '1990-01-15',
    address: "Yangon",
    created_at: '2024-01-01',
    updated_at: '2024-05-10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    creator: 'Editor',
    type: 'Staff',
    phone: '987-654-3210',
    dob: '1985-11-20',
    address: "Mandalay",
    created_at: '2023-12-15',
    updated_at: '2024-06-25'
  }
]);


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

function handleDelete(){
  console.log('Deleting user:', userDetail.value.id);
  closeModal();
}

function closeModal() {
  showDetailModal.value = false;
  showDeleteModal.value = false;
  userDetail.value = null;
}
</script>

<style scoped>
.card-custom {
  max-width: 1300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 183px);
}

.users-table-wrapper {
  flex-grow: 1; 
  overflow-y: auto;
  margin-top: 20px;
}
</style>
