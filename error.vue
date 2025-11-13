<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    
    <div 
      class="card text-center p-5 shadow-lg rounded-4" 
      style="max-width: 600px;"
    >
      
      <h1 class="display-1 fw-bolder text-custom-red mb-4">
        <i class="bi custom-align me-2"></i>Oops!
      </h1>
      
      <div class="mb-4">
        
        <p 
          v-if="error?.statusCode === 404" 
          class="fs-5 text-secondary"
        >
          The page you are looking for doesn't exist.
          <span class="text-muted d-block mt-2">
            Status Code: {{ error.statusCode }}
          </span>
        </p>
        
        <p 
          v-else 
          class="fs-5 text-secondary"
        >
          An unexpected error occurred. Please try again later.
          <span class="text-muted d-block mt-2">
            Status Code: {{ error?.statusCode || 'N/A' }}
          </span>
        </p>
      </div>
      
      <button 
        @click="handleClearError" 
        class="btn btn-custom-blue-dark btn-lg mt-3 w-75 mx-auto shadow-sm"
      >
        Go Home
      </button>
      
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleClearError = () => {
  clearError({ redirect: '/' });
};
</script>

<style scoped>
.custom-align {
    vertical-align: middle; 
}
</style>