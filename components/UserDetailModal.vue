<template>
  <div v-if="isVisible" class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
    
    <div class="modal-dialog modal-lg modal-dialog-centered">
      
      <div class="modal-content">
        
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="cancelAction"></button>
        </div>
        
        <div class="modal-body">
          
          <div class="row align-items-start">
            
            <div class="col-md-3 mb-3 mb-md-0 d-flex justify-content-center">
              <img :src="imageUrl"
                   alt="User Photo" 
                   class="img-fluid rounded shadow-sm" 
                   style="max-height: 150px; max-width: 150px;">
            </div>
            
            <div class="col-md-9">
              <table class="table table-striped table-borderless mb-0">
                <tbody>
                  <tr>
                    <td class="col-4 fw-bold py-2">ID</td>
                    <td class="col-8 py-2">{{ data.id }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Name</td>
                    <td class="col-8 py-2">{{ data.name }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Email</td>
                    <td class="col-8 py-2">{{ data.email }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Type</td>
                    <td class="col-8 py-2">{{ data.type === 'ADMIN' ? 'Admin' : 'User' }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Phone</td>
                    <td class="col-8 py-2">{{ data.phone }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Date of Birth</td>
                    <td class="col-8 py-2">{{ data.dob }}</td>
                  </tr>
                  <tr>
                    <td class="col-4 fw-bold py-2">Address</td>
                    <td class="col-8 py-2">{{ data.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-footer justify-content-end">
          <button type="button" @click="cancelAction" class="btn btn-custom-blue">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { useImageUrl } from '#imports'
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
const { buildImageUrl } = useImageUrl()
const imageUrl = computed(() => {
  return buildImageUrl(props.data.profile, 'https://via.placeholder.com/150/f8f9fa/343a40?text=User')
})

function cancelAction() {
  emit('cancel');
}
</script>

<style scoped>

.modal.fade.show {
  display: block;
}
</style>
