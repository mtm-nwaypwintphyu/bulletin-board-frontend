<template>
  <div class="container d-flex justify-content-center align-items-start mx-auto p-4">
    <div class="card my-4 w-100 rounded-4 bg-white shadow-lg mx-auto card-custom d-flex flex-column">
      <HeaderRow title="Edit User" />

      <div v-if="userStore.loading" class="text-center py-5">
        <Loading :show="true" />
      </div>

      <form v-else @submit.prevent="handleSubmit" class="px-3 py-2">
        <div class="row my-3 align-items-center">
          <label for="name" class="col-md-3 col-form-label text-md-end required-label">Name</label>
          <div class="col-md-8">
            <input type="text" id="name" v-model="name" class="form-control" />
            <small v-if="errors.name" class="error-box">{{ errors.name }}</small>
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="email" class="col-md-3 col-form-label text-md-end">Email Address</label>
          <div class="col-md-8">
            <input type="text" id="email" v-model="email" class="form-control" disabled />
          </div>
        </div>

        <div v-if="auth.isAdmin" class="row my-3 align-items-center">
          <label for="type" class="col-md-3 col-form-label text-md-end">Type</label>
          <div class="col-md-8">
            <select v-model="type" name="type" class="form-control" id="type">
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="phone" class="col-md-3 col-form-label text-md-end">Phone</label>
          <div class="col-md-8">
            <input type="tel" id="phone" v-model="phone" class="form-control" />
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="dob" class="col-md-3 col-form-label text-md-end">Date of Birth</label>
          <div class="col-md-8">
            <input type="date" id="dob" v-model="dob" class="form-control" />
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="address" class="col-md-3 col-form-label text-md-end">Address</label>
          <div class="col-md-8">
            <input type="text" id="address" v-model="address" class="form-control" />
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label class="col-md-3 col-form-label text-md-end">Profile</label>
          <div class="col-md-8 d-flex align-items-center gap-2">
            <img :src="imageUrl" alt="Profile Photo" class="img-fluid border border-3 shadow-sm"
              style="max-width: 150px; max-height: 150px; object-fit: cover;" />
            <button v-if="old_pf && !removeProfile" type="button" class="btn btn-sm btn-custom-red"
              @click="removePhoto">Remove</button>
          </div>
        </div>

        <div class="row my-3 mb-5 align-items-center">
          <label for="profile" class="col-md-3 col-form-label text-md-end">New Profile</label>
          <div class="col-md-8">
            <input type="file" id="profile" class="form-control" @change="handleFileUpload" />
          </div>
        </div>

        <div class="row align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end align-items-center">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-1 p-2 px-3">Next</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 me-3 p-2 px-3"
              @click.prevent="navigateTo('/user')">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Loading :show="userStore.loading" />
</template>

<script setup>
import { ref } from 'vue';
import HeaderRow from '~/components/HeaderRow.vue';
import Loading from '~/components/Loading.vue';
import { useAuthStore, useImageUrl, useRoute, navigateTo } from '#imports';
import { useUserStore } from '~/stores/Admin/userStore';
import { useUserEditFormStore } from '~/stores/userEditForm';
import { useToast } from 'vue-toastification';

const auth = useAuthStore();
const userStore = useUserStore();
const userForm = useUserEditFormStore();
const toast = useToast();
const route = useRoute();
const { buildImageUrl } = useImageUrl();

const userId = Number(route.params.id);

const name = ref('');
const email = ref('');
const phone = ref('');
const dob = ref('');
const address = ref('');
const type = ref('USER');
const old_pf = ref(null);
const new_pf = ref(null);
const removeProfile = ref(false);

const errors = reactive({ name: '' });

const imageUrl = computed(() => {
  if (new_pf.value) return URL.createObjectURL(new_pf.value)
  if (removeProfile.value) return buildImageUrl(null)
  return buildImageUrl(old_pf.value)
});

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  new_pf.value = file
  removeProfile.value = false
}

function removePhoto() {
  removeProfile.value = true
  new_pf.value = null
}

onMounted(async () => {
  const response = await userStore.getById(userId)
  if (!response) {
    toast(userStore.error?.message || 'Failed to load user.')
    navigateTo('/user')
    return
  }
  const user = response.data.user
  name.value = user.name
  email.value = user.email
  phone.value = user.phone || ''
  dob.value = user.dob ? String(user.dob).slice(0, 10) : ''
  address.value = user.address || ''
  type.value = user.type
  old_pf.value = user.profile || null
})

const handleSubmit = async () => {
  errors.name = ''
  if (!name.value) {
    errors.name = 'Name is required!'
    return
  }

  const params = {
    id: userId,
    name: name.value,
    phone: phone.value,
    dob: dob.value,
    address: address.value,
    profile: new_pf.value || (removeProfile.value ? '' : null),
    oldProfile: old_pf.value,
    removeProfile: removeProfile.value,
  }

  if (auth.isAdmin) {
    params.type = type.value
  }

  userForm.setForm(params)
  navigateTo(`/user/edit-confirm/${userId}`)
}
</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 151px);
}
</style>
