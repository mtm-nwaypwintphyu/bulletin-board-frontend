<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Edit Confirm" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="name" class="w-300">Name</label>
          <input disabled type="text" id="name" v-model="name" class="form-control" />
        </div>

        <div v-if="auth.isAdmin" class="form-group px-3 my-3 d-flex align-items-center">
          <label for="type" class="w-300">Type</label>
          <select name="type" class="form-control" id="type" disabled v-model="type">
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="phone" class="w-300">Phone</label>
          <input disabled type="phone" id="phone" v-model="phone" class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="dob" class="w-300">Date of Birth</label>
          <input disabled type="date" id="dob" v-model="dob" class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="address" class="w-300">Address</label>
          <input disabled type="text" id="address" v-model="address" class="form-control" />
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="old_profile" class="w-300">Current Profile</label>
          <div v-if="oldProfile" class="d-flex">
            <img :src="oldProfileUrl" alt="Current Profile" class="img-thumbnail"
              style="max-width: 150px; max-height: 150px; object-fit: cover;" />
          </div>
          <div v-else>
            <span>No photo</span>
          </div>
        </div>

        <div class="form-group px-3 my-3 d-flex align-items-center">
          <label for="profile" class="w-300">New Profile</label>
          <div v-if="userForm.form.profile" class="d-flex">
            <img :src="profilePreview" alt="New Profile" class="img-thumbnail"
              style="max-width: 150px; max-height: 150px; object-fit: cover;" />
          </div>
          <div v-else-if="userForm.form.removeProfile">
            <span class="text-danger">Profile photo will be removed</span>
          </div>
          <div v-else>
            <span>No new photo uploaded</span>
          </div>
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue m-1 p-2">Confirm</button>
            <button type="reset" class="btn btn-sm btn-custom-red m-1 p-2"
              @click.prevent="navigateTo(`/user/edit/${id}`)">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import HeaderRow from '~/components/HeaderRow.vue';
import { useAuthStore, useImageUrl, useRoute, navigateTo } from '#imports';
import { useUserStore } from '~/stores/Admin/userStore';
import { useUserEditFormStore } from '~/stores/userEditForm';
import { useToast } from 'vue-toastification';

const toast = useToast();
const userStore = useUserStore();
const userForm = useUserEditFormStore();
const auth = useAuthStore();
const route = useRoute();
const { buildImageUrl } = useImageUrl();

const id = userForm.form.id || Number(route.params.id);
const name = userForm.form.name;
const type = userForm.form.type;
const phone = userForm.form.phone;
const dob = userForm.form.dob;
const address = userForm.form.address;
const oldProfile = userForm.form.oldProfile;

const profilePreview = computed(() => {
  return userForm.form.profile ? URL.createObjectURL(userForm.form.profile) : null
})

const oldProfileUrl = computed(() => {
  return buildImageUrl(oldProfile)
})

const handleSubmit = async () => {
  const params = {
    name,
    phone,
    dob,
    address,
    profile: userForm.form.profile
  };

  if (auth.isAdmin) {
    params.type = type
  }

  const response = await userStore.update(id, params)
  if (userStore.error) {
    toast(userStore.error.message || 'Something went wrong!')
  } else if (response && response.status === 'success') {
    toast('User updated successfully.')
    userForm.clearForm()
    navigateTo('/user');
  }
}
</script>
<style scoped>
.container{
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 780px;
}
</style>
