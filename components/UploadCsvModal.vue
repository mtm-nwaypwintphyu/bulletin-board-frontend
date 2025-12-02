<template>
  <div v-if="isVisible" class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 rounded-3">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="cancelAction"></button>
        </div>

        <button @click="clickDownload" class="col-5 my-3 ms-3 d-flex btn btn-sm bg-custom-soft-orange">
          Download CSV Template
          <Icon name="material-symbols:download" class="fs-5 align-items-center" />
        </button>

        <form @submit.prevent="clickUpload" action="" enctype="multipart/form-data">
          <div class="modal-body row justify-content-between">
            <div class="col-8">
              <input type="file" class="form-control" @change="handleFileChange" accept=".csv,.txt" />
            </div>
            <button type="submit" class="col-4 d-flex btn btn-sm bg-custom-soft-yellow">
              Upload User CSV
              <Icon name="material-symbols:upload" class="fs-5 align-items-center" />
            </button>
          </div>
        </form>

        <div class="modal-footer justify-content-end">
          <button type="button" @click="cancelAction" class="btn btn-custom-blue">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>
  
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);
const emit = defineEmits(['cancel', 'download', 'upload']);
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

function clickDownload() {
  emit('download');
}

function handleFileChange(event) {
  file.value = event.target.files[0];
}

function clickUpload() {
  if (!file.value) {
    alert('Please select a CSV file to upload.');
    return;
  }

  emit('upload', file.value);
}
</script>

<style scoped>
.modal.fade.show {
  display: block;
}
</style>
