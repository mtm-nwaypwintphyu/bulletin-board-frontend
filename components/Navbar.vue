<template>
  <nav class="navbar navbar-expand-lg bg-custom-blue px-4">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand text-white fw-bold" to="/">Bulletin Board</nuxt-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link text-white" :class="{ 'active' : isActive('/user')}" to="/user">Users</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link text-white" :class="{ 'active' : isActive('/')}" to="/">Posts</nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center">
          <li class="nav-item me-3" v-if="auth.user.type == 0">
            <nuxt-link class="btn btn-outline-light" to="/admin/create-user">Create User</nuxt-link>
          </li>

          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle text-white d-flex align-items-center"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user?.name }} <Icon name="material-symbols:account-circle" class="fs-4" />
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><nuxt-link class="dropdown-item" to="/user/profile">Profile</nuxt-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><nuxt-link class="dropdown-item" @click.prevent="handleLogout">Logout</nuxt-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Loading :show="auth.loading"/>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';
import Loading from './Loading.vue';

const route = useRoute();
const auth = useAuthStore();
const toast = useToast();
const user = computed(() => auth.user)

defineProps({
  hideCreateUserButton: {
    type: Boolean
  }
})

const isActive = (path) => {
  return route.path === path;
}

const handleLogout = async() => {
  await auth.logout()
  toast("Loggedout successfully.");
  navigateTo('/login')
}
</script>

<style scoped>
.navbar-nav {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.nav-link {
  padding: 10px 25px;
  text-decoration: none;
  color: var(--primary);
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link.active {
  color: var(--dark);
  background-color: var(--bg-soft-orange);
  font-weight: bold;
  border-radius: 5px;
}

.nav-link:hover {
  color: var(--bg-soft-orange);
}

.dropdown-item:focus {
  outline: none;
  background-color: #2C3E50;
}
</style>
