<script setup>
  import { Post } from '@/models/Post.js';
import { useRoute } from 'vue-router';

  const route = useRoute();

  const props = defineProps({
    postProp: { type: Post, required: true }
  })
</script>


<template>
  <div class="p-3 mb-3">
    <div class="d-flex">
      <router-link v-if="route.name === 'Home'" :to="{ name: 'ProfileDetails', params: { profileId: postProp.creatorId } }" :title="`Go to ${postProp.creator.name}'s profile page!'`">
        <img class="img-fluid me-2" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
      <div>
        <p>{{ postProp.creator.name }}<br>{{ postProp.createdAt.toLocaleDateString() }} {{ `${postProp.creator.graduated ? '🎓' : ''}` }}</p>
        <!-- <p><i class="fa-solid fa-heart" style="color: #63E6BE;"></i>{{postProp.likeIds.length}}</p> -->
      </div>
    </div>
    <div>
      <p>{{ postProp.body }}</p>
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
  img {
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
</style>