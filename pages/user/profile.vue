<template>
  <div class="container d-flex justify-content-center mx-auto my-4">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="User Profile" />
      
      <div class="row p-4 align-items-start">
        <div class="col-12 col-md-4 text-center mb-4 mb-md-0">
          <img 
            :src="imageUrl" 
            alt="Profile Photo"
            class="img-fluid rounded-circle border border-3 shadow-sm"
            style="width: 150px; height: 150px; object-fit: cover;"
          />
          <h5 class="mt-3 fw-bold">{{ user.name }}</h5>
          <p class="text-muted">{{ user.type === 0 ? 'Admin' : 'User' }}</p>
        </div>
        
        <div class="col-12 col-md-8">
          <table class="table table-striped table-bordered table-sm">
            <tbody>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">Name</td>
                <td class="col-8 py-2">{{ user.name }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">User Type</td>
                <td class="col-8 py-2">
                  <span :class="{'badge ': user.type === 0, 'badge bg-success': user.type === 1}">
                    {{ user.type === 0 ? 'Admin' : 'Regular User' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">Email</td>
                <td class="col-8 py-2">{{ user.email }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">Phone</td>
                <td class="col-8 py-2">{{ user.phone }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">Date of Birth</td>
                <td class="col-8 py-2">{{ user.dob }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold text-muted py-2">Address</td>
                <td class="col-8 py-2">{{ user.address }}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="d-flex justify-content-end mt-4">
            <button class="btn btn-custom-blue px-4 shadow-sm" @click="navigateTo('/user/edit-profile')">Edit Profile</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import { useAuthStore } from '#imports';
import { useRuntimeConfig } from '#imports';

const auth = useAuthStore();
const config = useRuntimeConfig();

const assetsBase = config.public.assetsBase;
const user = ref(auth.user)

const imageUrl = computed(() => {
  return user.value.profile ? `${assetsBase}/${user.value.profile}` : 'https://placehold.co/150x150/0d6efd/ffffff?text=Profile'
})

</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 200px);
}
</style>
