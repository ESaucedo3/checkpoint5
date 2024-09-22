<script setup>
import { AppState } from '@/AppState.js';
import { postService } from '@/services/PostService.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

  const currentPage = computed(() => AppState.currentPage);
  const totalPages = computed(() => AppState.totalPages);

  async function changePage(pageNumber) {
    try {
      await postService.changePage(pageNumber);
    }
    catch (error){
      Pop.error(error);
    }
  }
</script>


<template>
  <div class="d-flex justify-content-between">
    <button @click="changePage(currentPage - 1)" type="button" :disabled="currentPage === 1"><i class="fa-solid fa-arrow-left"></i> Newer</button>
    <button @click="changePage(currentPage + 1)" type="button" :disabled="currentPage === totalPages">Older <i class="fa-solid fa-arrow-right"></i></button>
  </div>
</template>

<style lang="scss" scoped>
  button {
    background: none;
    border: none;
  }
</style>