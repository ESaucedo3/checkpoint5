<script setup>
  import { AppState } from '@/AppState.js';
  import { Post } from '@/models/Post.js';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const account = computed(() => AppState.account);

  const props = defineProps({
    postProp: { type: Post, required: true }
  })
</script>


<template>
  <div class="p-3 card-custom">
    <div class="d-flex">
      <router-link v-if="route.name === 'Home'" :to="{ name: 'ProfileDetails', params: { profileId: postProp.creatorId } }" :title="`Go to ${postProp.creator.name}'s profile page!'`">
        <img class="img-fluid me-2 creator-img" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
      <img v-else class="img-fluid" :src="postProp.creator.picture" :alt="postProp.creator.name">
      <div>
        <p>{{ postProp.creator.name }}<br>{{ postProp.createdAt.toLocaleDateString() }} {{ `${postProp.creator.graduated ? '🎓' : ''}` }}</p>
      </div>
      <div v-if="account.id === postProp.creatorId" class="ms-auto">
        ... Change Post or Delete
      </div>
    </div>
    <div class="actual">
      <p>{{ postProp.body }}</p>
      <img class="img-post" :src="postProp.imgUrl" :alt="postProp.creator.name">
      <div class="text-end">
        <button class="selectable" type="button">
          <i class="fa-solid fa-heart" style="color: #63E6BE;"></i>
          <i class="fa-regular fa-heart" style="color: #63E6BE;"></i>
          {{ postProp.likes.length }}
        </button>
      </div>
      <!-- TODO Use to check wether if user like or not if yes then full highlight otherwise the other one -->
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .creator-img {
    height: 3rem;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  p {
    margin: 0;
  }

  button {
    background: none;
    border: none;
  }

  .card-custom {
    background-color: rgb(224, 234, 242);
    box-shadow: 1px 1px 9px rgba(#333, 0.2);
  }

  .img-post {
    height: 60dvh;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }
</style>