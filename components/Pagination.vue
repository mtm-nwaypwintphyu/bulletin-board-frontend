<template>
  <div class="my-2">
    <ul class="pagination justify-content-end me-2 mb-0">
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <button 
          class="page-link btn-pagination" 
          @click="clickPrevious" 
          :disabled="currentPage === 1">
          Previous
        </button>
      </li>

      <li class="page-item disabled">
        <span class="page-link btn-pagination">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
      </li>

      <li :class="['page-item', { disabled: currentPage === totalPages }]">
        <button 
          class="page-link btn-pagination" 
          @click="clickNext" 
          :disabled="currentPage === totalPages">
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits();

function clickNext() {
  if (props.currentPage < props.totalPages) {
    emit('updatePage', props.currentPage + 1);
  }
}

function clickPrevious() {
  if (props.currentPage > 1) {
    emit('updatePage', props.currentPage - 1);
  }
}
</script>
