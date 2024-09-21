<script setup>
  import { AppState } from '@/AppState.js';
  import Pagination from '@/components/Pagination.vue';
  import PostCard from '@/components/PostCard.vue';
  import PostForm from '@/components/PostForm.vue';
  import { postService } from '@/services/PostService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, onMounted } from 'vue';

  const posts = computed(() => AppState.posts);
  const account = computed(() => AppState.account);

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
    <section class="row justify-content-center py-3">
      <div class="col-9">
        <div class="row gy-3">
          <div v-if="account" class="col-12">
            <PostForm />
          </div>
          <div v-for="post in posts" :key="post.id" class="col-12">
            <PostCard :postProp="post" />
          </div>
          <div class="col-12">
            <Pagination />
          </div>
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

  img {
    height: 17dvh;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .graduate {
    position: absolute;
  }
</style>
