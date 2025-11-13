<template>
  <div class="text-white size-2 header bg-custom-blue p-3">{{ title }}</div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.header {
  border-radius: 10px 10px 0 0;
}
</style>
