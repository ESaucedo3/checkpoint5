<script setup>
  import { AppState } from '@/AppState.js';
  import { computed } from 'vue';

  const activeAccount = computed(() => AppState.activeProfile);
  const account = computed(() => AppState.account);
</script>


<template>
  <div class="card-custom p-2">
    <img class="w-100 cover-img position-relative" :src="activeAccount?.coverImg" :alt="`${activeAccount?.name}'s cover image`">
    <div class="d-flex align-items-center">
      <img class="creator-img" :src="activeAccount?.picture" alt="">
      <i v-if="activeAccount?.graduated" class="fa-solid fa-graduation-cap fa-lg graduate"></i>
    </div>
    <div class="mt-1">
      <a href="https://github.com/"><i class="fa-brands fa-github fa-xl ms-2"></i></a>
      <a class="mx-2" href="https://www.linkedin.com/"><i class="fa-brands fa-linkedin fa-xl"></i></a>
      <a href="https://www.resume.com/"><i class="fa-solid fa-address-book fa-xl"></i></a>
    </div>
    
    <div v-if="account">
      <h3>{{ activeAccount?.name }}</h3>
      <p>{{ activeAccount?.bio }} | {{  activeAccount?.class }}</p>
    </div>
    <div v-if="activeAccount?.id === account?.id" class="text-end">
      <button class="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#accountModal">Edit</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .card-custom {
    background-color: rgb(224, 234, 242);
    box-shadow: 1px 1px 9px rgba(#333, 0.2);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .cover-img {
    height: 23dvh;
    object-fit: cover;
  }

  .creator-img {
    height: 11dvh;
    border-radius: 50%;
    aspect-ratio: 1/1;
    position: relative;
  }

  .graduate {
    background-color: aliceblue;
    padding: 1rem .3rem 1rem .3rem;
    border: 2px solid lightblue;
    border-radius: 50%;
    height: 3dvh;
  }
</style>