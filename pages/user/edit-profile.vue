<template>
  <div class="container d-flex justify-content-center align-items-start mx-auto p-4">
    <div class="card my-4 w-100 rounded-4 bg-white shadow-lg mx-auto card-custom d-flex flex-column"> 
      <HeaderRow title="Edit Profile" />
      <form @submit.prevent="handleSubmit" class="px-3 py-2">
        <input type="hidden" name="id" v-model="user_id"/>
        <div class="row my-3 align-items-center">
          <label for="name" class="col-md-3 col-form-label text-md-end required-label">Name</label>
          <div class="col-md-8">
            <input type="text" id="name" v-model="name" class="form-control" />
            <small v-if="errors.name" class="error-box">{{ errors.name }}</small>
          </div>
        </div>
        
        <div class="row my-3 align-items-center">
          <label for="name" class="col-md-3 col-form-label text-md-end required-label">Email Address</label>
          <div class="col-md-8">
            <input type="text" id="email" v-model="email" class="form-control" />
            <small v-if="errors.email" class="error-box">{{ errors.email }}</small>
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="type" class="col-md-3 col-form-label text-md-end">Type</label>
          <div class="col-md-8">
            <select v-model="type" name="type" class="form-control" id="type">
              <option value="0">Admin</option>
              <option value="1">User</option>
            </select>
          </div>
        </div>

        <div class="row my-3 align-items-center">
          <label for="type" class="col-md-3 col-form-label text-md-end">Phone</label>
          <div class="col-md-8">
            <input type="phone" id="phone" v-model="phone" class="form-control" />
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
          <label for="old_pf" class="col-md-3 col-form-label text-md-end">Profile</label>
          <div class="col-md-8">
            <img 
            :src="imageUrl" 
            alt="Profile Photo"
            class="img-fluid border border-3 shadow-sm"
            style="max-width: 150px; max-height: 150px; object-fit: cover;"
          />
          </div>
        </div>
        <div class="row my-3 mb-5 align-items-center">
          <label for="new_pf" class="col-md-3 col-form-label text-md-end">New Profile</label>
          <div class="col-md-8">
            <input type="file" id="profile" class="form-control" @change="handleFileUpload" />
          </div>
        </div>

        <div class="row align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end align-items-center">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-1 p-2 col-1">Edit</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 me-3 p-2 col-1">Clear</button>
            <a href="" @click.prevent="navigateTo('/user/change-password')">Change Password</a>
          </div>
          <div class="">
            <a href="#" @click.prevent="navigateTo('/user/profile')" class="btn btn-sm btn-custom-blue p-2 px-4">Back</a>
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
import { useAuthStore } from '#imports';
import { useUserStore } from '~/stores/Admin/userStore';
import { useToast } from 'vue-toastification';
import { useRuntimeConfig } from '#imports';

const auth = useAuthStore()
const userStore = useUserStore();
const toast = useToast();
const config = useRuntimeConfig();

const assetsBase = config.public.assetsBase;

const user = { ...auth.user }
const user_id = ref(user.id);
const name = ref(user.name || '')
const email = ref(user.email || '')
const phone = ref(user.phone || '')
const dob = ref(user.dob || '')
const address = ref(user.address || '')
const type = ref(user.type || 1)
const old_pf = ref(user.profile || null)
const new_pf = ref(null)

const errors = reactive({
  name: '',
  email: '',
})

const imageUrl = computed(() => {
  return new_pf.value || (old_pf.value ? `${assetsBase}/${old_pf.value}` : 'https://placehold.co/150x150/0d6efd/ffffff?text=Profile')
})

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onloadend = () => {
    new_pf.value = reader.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async() => {
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!name.value) errors.name = 'Name is required!'
  if (!email.value) errors.email = 'Email is required!'
  if (Object.values(errors).some(e => e)) return

  const params = {
    id: user_id.value,
    name: name.value,
    email: email.value,
    phone: phone.value,
    dob: dob.value,
    address: address.value,
    type: type.value,
    profile: new_pf.value
  }
  const response = await userStore.update(params)
  if (userStore.error) {
    const backendErrors = toRaw(userStore.error)?.errors || {};

    const errorMessages = Object.values(backendErrors)
      .flat()
      .map(msg => msg.trim());

    const toastMessage = errorMessages.length
      ? errorMessages[0] + "!"
      : userStore.error.message
        ? userStore.error.message + "!"
        : "Something went wrong!";

    toast(toastMessage);
  } else if (response && response.success) {
    auth.user = response.data
    navigateTo('/user/profile')
    toast("User updated successfully.");
  }
}

</script>

<style scoped>
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 151px);
}
</style>
