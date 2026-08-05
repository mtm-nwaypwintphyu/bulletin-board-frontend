<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Register" />

      <form @submit.prevent="handleSubmit" class="p-3">
        <div class="row mb-3 align-items-center">
          <label for="name" class="col-md-3 col-form-label text-md-end required-label">Name</label>
          <div class="col-md-9">
            <input type="text" id="name" v-model="userForm.form.name" class="form-control" />
            <small v-if="errors.name" class="error-box">{{ errors.name }}</small>
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="email" class="col-md-3 col-form-label text-md-end required-label">Email Address</label>
          <div class="col-md-9">
            <input type="email" id="email" v-model="userForm.form.email" class="form-control" />
            <small v-if="errors.email" class="error-box">{{ errors.email }}</small>
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="password" class="col-md-3 col-form-label text-md-end required-label">Password</label>
          <div class="col-md-9">
            <input type="password" id="password" v-model="userForm.form.password" class="form-control" />
            <small v-if="errors.password" class="error-box">{{ errors.password }}</small>
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="password_confirmation" class="col-md-3 col-form-label text-md-end required-label">Confirm Password</label>
          <div class="col-md-9">
            <input type="password" id="password_confirmation" v-model="userForm.form.password_confirmation" class="form-control" />
            <small v-if="errors.password_confirmation" class="error-box">{{ errors.password_confirmation }}</small>
          </div>
        </div>

        <div v-if="auth.isAdmin" class="row mb-3 align-items-center">
          <label for="type" class="col-md-3 col-form-label text-md-end">Type</label>
          <div class="col-md-9">
            <select name="type" v-model="userForm.form.type" class="form-select" id="type"> 
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="phone" class="col-md-3 col-form-label text-md-end">Phone</label>
          <div class="col-md-9">
            <input type="tel" id="phone" v-model="userForm.form.phone" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="dob" class="col-md-3 col-form-label text-md-end">Date of Birth</label>
          <div class="col-md-9">
            <input type="date" id="dob" v-model="userForm.form.dob" class="form-control" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label for="address" class="col-md-3 col-form-label text-md-end">Address</label>
          <div class="col-md-9">
            <input type="text" id="address" v-model="userForm.form.address" class="form-control" />
          </div>
        </div>

        <div class="row mb-4 align-items-center">
          <label for="profile" class="col-md-3 col-form-label text-md-end">Profile Photo</label>
          <div class="col-md-9">
            <input value="" type="file" id="profile" class="form-control" @change="handleFileUpload"/>
          </div>
        </div>

        <div class="row justify-content-end mb-3">
          <div class="col-md-9 d-flex justify-content-end">
            <button type="submit" class="btn btn-custom-blue px-4">Register</button>
            <button type="button" @click="clearFields" class="btn btn-custom-red mx-1 ps">Clear</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import HeaderRow from '~/components/HeaderRow.vue'
import { useUserFormStore, useAuthStore } from '#imports'

const userForm = useUserFormStore()
const auth = useAuthStore()

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  userForm.setProfilePhoto(file)
}

const handleSubmit = () => {
  // reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!userForm.form.name) errors.name = 'Name is required!'
  if (!userForm.form.email) errors.email = 'Email is required!'
  if (!userForm.form.password) errors.password = 'Password is required!'
  if (userForm.form.password && userForm.form.password.length < 6)
    errors.password = 'Password must be at least 6 characters!'
  if (!userForm.form.password_confirmation)
    errors.password_confirmation = 'Password confirmation is required!'
  if (userForm.form.password !== userForm.form.password_confirmation)
    errors.password_confirmation = 'Passwords do not match!'

  if (Object.values(errors).some(e => e)) return

  // create copy
  const params = { ...userForm.form }
  userForm.setForm(params)
  navigateTo('/admin/confirm-create-user')
}

const clearFields = () => {
  userForm.clearForm()
}
</script>

<style scoped>
.container{
  min-height: calc(100vh - 200px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 750px;
}
</style>
