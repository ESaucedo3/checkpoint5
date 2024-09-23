<script setup>
import { Account } from '@/models/Account.js';

  defineProps({
    userProp: { type: Account, required: true }
  })
</script>


<template>
  <div class="d-flex align-items-center p-2 profile-contain mb-3">
    <div class="img-contain me-3">
      
      <img :src="userProp.picture" :alt="userProp.name">
    </div>
    <div class="w-100">
      <i v-if="userProp.graduated" class="fa-solid fa-graduation-cap fa-lg graduate"></i>
      <p class="m-0">{{ userProp.class }}</p>
      <h3>{{ userProp.name }}</h3>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .profile-contain {
    background-color: rgb(224, 234, 242);
    box-shadow: 1px 1px 9px rgba(51, 51, 51, 0.2);
  }

  .img-contain {
    max-width: fit-content;

    & img {
      border-radius: 50%;
      aspect-ratio: 1/1;
      height: 13dvh;
    }
  }

  .graduate {
    background-color: aliceblue;
    padding: 1rem .3rem 1rem .3rem;
    border: 2px solid lightblue;
    border-radius: 50%;
    height: 3dvh;
  }
</style>