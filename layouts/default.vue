<template>
  <div>
    <Navbar 
      :hide-create-user-button="hideCreateUserButton"
    /> 
    <NuxtPage /> 
    <Footer />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

const route = useRoute();

const hideCreateUserButton = computed(() => {
  return route.path == '/admin/create-user';
})
</script>
