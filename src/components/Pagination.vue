<script setup>
  import { AppState } from '@/AppState.js';
  import { postService } from '@/services/PostService.js';
  import Pop from '@/utils/Pop.js';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const currentPage = computed(() => AppState.currentPage);
  const totalPages = computed(() => AppState.totalPages);
  const route = useRoute();

  async function changePage(pageNumber) {
    try {
      if (route.name === 'Home') {
        await postService.changeHomePage(pageNumber);
      }
      else {
        const profileId = route.params.profileId;
        await postService.changeUserPage(pageNumber, profileId);
      }
      
      // TODO fix pagination for profile, add in input for name in modal, change the social links to where it will actually display their socials links
      // api/profiles/:profileId/posts?page=2
      // api/posts?creatorId=:profileId&page=2
    }
    catch (error){
      Pop.error(error);
    }
  }
</script>

<template>
  <div class="d-flex justify-content-between">
    <button @click="changePage(currentPage - 1)" type="button" :disabled="currentPage === 1"><i class="fa-solid fa-arrow-left"></i> Newer</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" type="button" :disabled="currentPage === totalPages">Older <i class="fa-solid fa-arrow-right"></i></button>
  </div>
</template>

<style lang="scss" scoped>
  button {
    background: none;
    border: none;
  }
</style>