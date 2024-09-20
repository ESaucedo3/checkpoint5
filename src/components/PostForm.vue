<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';

  const activeAccount = computed(() => AppState.account);
</script>


<template>
    <div class="col-3 d-flex justify-content-end">
      <img class="img-fluid" :src="activeAccount.coverImg" alt="Not sure">
    </div>
    <div class="col-9">
      <form>
        <textarea class="form-control" name="" id="" placeholder="Test" rows="3"></textarea>
        <div class="d-flex justify-content-between">
          <button type="button">Photos/Videos <i class="fa-solid fa-photo-film" style="color: #74C0FC;"></i></button>
          <button type="button"><i class="fa-regular fa-paper-plane" style="color: #74C0FC;"></i> Post</button>
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
    height: 11dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
</style>