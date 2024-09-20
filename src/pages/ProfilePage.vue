<script setup>
  import { AppState } from '@/AppState.js';
  import { postService } from '@/services/PostService.js';
  import { profileService } from '@/services/ProfileService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import PostCard from '@/components/PostCard.vue';
  import PostForm from '@/components/PostForm.vue';

  const route = useRoute();
  const activeProfile = computed(() => AppState.activeProfile);
  const posts = computed(() => AppState.posts)

  watch(() => route.params.profileId, () => {
    getProfileById();
    getPostsByCreatorId();
  }, { immediate: true })
  
  async function getProfileById() {
    try {
      const profileId = route.params.profileId;
      await profileService.getProfileById(profileId);
    }
    catch (error){
      Pop.error(error);
    }
  }

  async function getPostsByCreatorId() {
    try {
      const profileId = route.params.profileId;
      await postService.getPostsByCreatorId(profileId);
    }
    catch (e){
      Pop.error(e);
    }
  }
</script>


<template>
  <section class="container">
    <section class="row">
      <div class="col-12">
        <PostForm />
      </div>
    </section>
    <div class="row justify-content-center">
      <div v-for="post in posts" :key="post.id" class="col-12 adjust">
        <PostCard :postProp="post" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
  .adjust {
    width: 90%;
  }
</style>