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
        <div v-if="activeAccount" class="d-flex flex-column align-items-center">
          <img class="img-fluid mb-2 position-relative" :src="activeAccount.coverImg" :alt="activeAccount.name">
          <div class="graduate">
            <label>{{`${activeAccount.graduated ? '🎓' : 'No'}`}}</label>
          </div>
          <p>{{ activeAccount.name }}</p>
        </div>
        <div v-else>
          <p class="text-center">Login Or Sign Up</p>
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

  img {
    height: 17dvh;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .graduate {
    position: absolute;
  }
</style>
