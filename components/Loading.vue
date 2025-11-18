<template>
  <div class="loading-overlay" v-if="show">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0,0,0,0.1);
  border-left-color: #2c3e50cc;
  border-radius: 50%;
  width: 50px; height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
