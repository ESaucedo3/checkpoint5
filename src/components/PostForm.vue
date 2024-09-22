<script setup>
  import { AppState } from '@/AppState.js';
  import { postService } from '@/services/PostService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, ref } from 'vue';

  const activeAccount = computed(() => AppState.account);
  
  const editablePostData = ref({
    body: '',
    imgUrl: '',
  })

  const toggler = () => {
    toggled.value = !toggled.value
  }
  const toggled = ref(false);

  async function createPost() {
    try {
      const postData = editablePostData.value;
      await postService.createPost(postData);
      editablePostData.value = {
        body: '',
        imgUrl: '',
      }
    }
    catch (e){
      Pop.error(e);
      logger.error(e)
    }
  }
</script>


<template>
  <div class="d-flex p-3 form-design">
    <img class="img-fluid mt-2 me-2" :src="activeAccount?.picture" alt="Not sure">
    <form @submit.prevent="createPost()" class="w-100">
      <textarea v-model="editablePostData.body" class="form-control" placeholder="Share what's happening" rows="3" maxlength="130" required></textarea>
      <div class="d-flex justify-content-between mt-2">
        <div>
          <button @click="toggler" type="button">Photos/Videos <i class="fa-solid fa-photo-film" style="color: #74C0FC;"></i></button>
          <input v-model="editablePostData.imgUrl" class="form-control special-input" v-if="toggled" type="url" placeholder="Image Url" maxlength="400">
        </div>
        <button>Post<i class="fa-regular fa-paper-plane" style="color: #74C0FC;"></i></button>
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