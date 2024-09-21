<script setup>
  import { AppState } from '@/AppState.js';
  import { computed, ref } from 'vue';

  const activeAccount = computed(() => AppState.account);
  const toggler = () => {
    toggled.value = !toggled.value
  }
  const toggled = ref(false);



</script>


<template>
  <div class="d-flex p-3 form-design">
    <img class="img-fluid mt-2 me-2" :src="activeAccount?.picture" alt="Not sure">
    <form class="w-100">
      <textarea class="form-control" placeholder="Share what's happening" rows="3"></textarea>
      <div class="d-flex justify-content-between mt-2">
        <div>
          <button @click="toggler" type="button">Photos/Videos <i class="fa-solid fa-photo-film" style="color: #74C0FC;"></i></button>
          <input class="form-control special-input" v-if="toggled" type="url" placeholder="Image Url">
        </div>
        <button type="button">Post<i class="fa-regular fa-paper-plane" style="color: #74C0FC;"></i></button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>
  textarea {
    resize: none;
  }

  button {
    border: none;
    background: none;
  }

  img {
    height: 6dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .special-input {
    display: inline;
    width: fit-content;
  }

  .form-design {
    background-color: rgb(224, 234, 242);
    box-shadow: 1px 1px 9px rgba(#333, 0.4);
  }
</style>