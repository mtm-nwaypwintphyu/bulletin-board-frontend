<template>
  <div v-if="isVisible" class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    
    <div class="modal-dialog modal-dialog-centered">
      
      <div class="modal-content shadow-lg border-0 rounded-3">
        
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="cancelAction"></button>
        </div>
        
        <div class="modal-body p-4">
          
          <table class="table table-borderless table-striped mb-0">
            <tbody>
              <tr>
                <td class="col-4 fw-bold py-2">ID</td>
                <td class="col-8 py-2">{{ data.id }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Title</td>
                <td class="col-8 py-2">{{ data.title }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Created Date</td>
                <td class="col-8 py-2">{{ data.description }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Created User</td>
                <td class="col-8 py-2">{{ data.status }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Updated Date</td>
                <td class="col-8 py-2">{{ data.date }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Updated User</td>
                <td class="col-8 py-2">{{ data.date }}</td>
              </tr>
            </tbody>
          </table>
          
        </div>

        <div class="modal-footer justify-content-end">
          <button type="button" @click="cancelAction" class="btn btn-custom-blue">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>
  
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['cancel']);
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  },
  data: {
    type: Object,
    required: true
  }
});

function cancelAction() {
  emit('cancel');
}
</script>

<style scoped>

.modal.fade.show {
  display: block;
}
</style>