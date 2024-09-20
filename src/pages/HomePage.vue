<script setup>
  import { AppState } from '@/AppState.js';
  import AdCard from '@/components/AdCard.vue';
import Pagination from '@/components/Pagination.vue';
  import PostCard from '@/components/PostCard.vue';
  import PostForm from '@/components/PostForm.vue';
  import { postService } from '@/services/PostService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, onMounted } from 'vue';

  const posts = computed(() => AppState.posts);
  const activeAccount = computed(() => AppState.account);

  onMounted(() => {
    getPosts();
  })

  async function getPosts() {
    try {
      await postService.getPosts();
    }
    catch (e){
      Pop.error(e);
      logger.error(e)
    }
  }
</script>

<template>
  <section class="container-fluid">
    <div class="row my-2">
      <div class="mobile col-3">
        <div>
          Account would go here but not sure how to quite position this yet for the middle
        </div>
      </div>
      <div class="col-12 col-md-6">
        <PostForm />
        <PostCard v-for="post in posts" :key="post.id" :postProp="post" />
        <Pagination />
      </div>
      <div class="mobile col-3">
        <AdCard />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  @media (width < 600px) {
    .mobile {
      display: none;
    }
  }

  button {
    background: none;
    border: none;
  }
</style>
