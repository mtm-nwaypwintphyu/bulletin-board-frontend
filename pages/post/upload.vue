<template>
  <div class="container d-flex justify-content-center mx-auto my-3">
    <div class="card w-100 my-4 shadow-lg rounded-4 card-custom">
      <HeaderRow title="Upload CSV File" />
      <button @click="handleCsvTemplateDownload" class="col-3 my-3 ms-3 d-flex btn btn-sm bg-custom-soft-green">
        Download CSV Template
        <Icon name="material-symbols:download" class="fs-5 align-items-center" />
      </button>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="form-group px-3 my-4">
          <label for="username">CSV File</label>
          <input @change="handleFileChange" type="file" id="username" class="form-control" accept=".csv,.txt" />
        </div>

        <div class="row d-flex justify-content-end align-items-center mb-2 m-auto">
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-custom-blue-dark m-1 p-2">Upload</button>
            <button type="reset" class="btn btn-sm btn-custom-red clear-btn m-1 p-2">Clear</button>
          </div>
          <div class="d-flex justify-content-start">
            <a href="#" @click.prevent="navigateTo('/')" class="btn btn-sm btn-custom-blue m-1 p-2 px-4">Back</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from '#imports';
import HeaderRow from '~/components/HeaderRow.vue';
import { usePostStore } from '#imports';
import { useToast } from 'vue-toastification';

const toast = useToast();
const file = ref(null);
const postStore = usePostStore();

const handleCsvTemplateDownload = () => {
  const headers = ['title','description']

  const rows = [
    ['Sample Title 7', 'Sample Description 3'],
    ['Sample Title 8', 'Sample Description 4']
  ]

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'post_import_template.csv'
  link.click()
  URL.removeObjectURL(link.href)
}

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if(selectedFile) {
    file.value = selectedFile;
  }
}
const handleSubmit = async() => {
  if(!file.value) {
    alert("Please selecte a file!");
  }
  const formData = new FormData();
  formData.append('file', file.value);

  const response = await postStore.importPostCsv(formData);

  if(postStore.error) {
    const backendErrors = postStore.error?.errors || {};
    const errorMessages = Object.values(backendErrors).flat().map(msg => msg.trim());
    const toastMessage = errorMessages.length
      ? errorMessages + "!"
      : postStore.error.message
      ? postStore.error.message + "!"
      : "Something went wrong!";

    toast(toastMessage)
  } else if (response?.success) {
    toast(response?.message)
    navigateTo('/')
  }
}
</script>

<style scoped>
.container{
  min-height: calc(100vh - 135px);
}
.card-custom {
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 350px;

}
</style>
