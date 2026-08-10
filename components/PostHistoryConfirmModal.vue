<template>
  <div v-if="isVisible" class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    
    <div class="modal-dialog modal-dialog-centered">
      
      <div class="modal-content shadow-lg border-0 rounded-3">
        
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="cancelAction"></button>
        </div>
        
        <div class="modal-body p-4">
          
          <h5 class="text-center fw-bold mb-4 text-custom-red">{{ message }}</h5>
          
          <table class="table table-borderless table-striped mb-0">
            <tbody>
              <tr>
                <td class="col-4 fw-bold py-2">ID</td>
                <td class="col-8 py-2">{{ data.id }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Import File</td>
                <td class="col-8 py-2">{{ data.import_file }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Record Imported</td>
                <td class="col-8 py-2">{{ data.records_imported }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Import Timestamp</td>
                <td class="col-8 py-2">{{ formatDate(data.import_timestamp) }}</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold py-2">Create User</td>
                <td class="col-8 py-2">{{ data.user.name }}</td>
              </tr>
            </tbody>
          </table>
          
        </div>

        <div class="modal-footer justify-content-center">
          <button type="button" @click="confirmAction" class="btn btn-custom-blue-dark me-2">Confirm</button>
          <button type="button" @click="cancelAction" class="btn btn-custom-blue">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>
  
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { useFormatDate } from '#imports';

const { formatDate } = useFormatDate();
const emit = defineEmits(['confirm', 'cancel']);
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: 'Are you sure you want to perform this action?'
  },
  data: {
    type: Object,
    required: true
  },
  title: {
    type: String
  }
});

function confirmAction() {
  emit('confirm', props.data);
}

function cancelAction() {
  emit('cancel');
}
</script>

<style scoped>
.modal.fade.show {
  display: block;
}
</style>
