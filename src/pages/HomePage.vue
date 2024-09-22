<script setup>
  import { AppState } from '@/AppState.js';
  import Pagination from '@/components/Pagination.vue';
  import PostCard from '@/components/PostCard.vue';
  import PostForm from '@/components/PostForm.vue';
import ProfileCard from '@/components/ProfileCard.vue';
  import { postService } from '@/services/PostService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, onMounted } from 'vue';

  const posts = computed(() => AppState.posts);
  const account = computed(() => AppState.account);
  const users = computed(() => AppState.users);

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
      <div class="col-md-9">
        <div class="row gy-3">
          <div v-if="users.length > 0">
            <h1>People</h1>
            <div v-for="user in users" :key="user.id" class="col-12">
              <ProfileCard :userProp="user" />
            </div>
          </div>
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

</style>
