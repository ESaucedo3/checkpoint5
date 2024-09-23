<script setup>
  import { AppState } from '@/AppState.js';
  import { Post } from '@/models/Post.js';
  import { postService } from '@/services/PostService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const account = computed(() => AppState.account);

  const props = defineProps({
    postProp: { type: Post, required: true }
  })

  const toggler = () => {
    toggle.value = !toggle.value;
  }
  const toggle = ref(false);
  const editablePostData = ref({
    body: '',
    imgUrl: ''
  })


  async function heartPost() {  
    try {
      await postService.heartPost(props.postProp.id)
    }
    catch (e){
      Pop.error(e);
      logger.error(e)
    }
  }

  async function updatePost() {
    try {
      const wantsToUpdate = await Pop.confirm('Confirm Changes?');
      if (!wantsToUpdate) return 
      const updatedPostData = editablePostData.value;
      await postService.updatePost(props.postProp.id, updatedPostData);
      toggle.value = !toggle.value;
      editablePostData.value = {
        body: '',
        imgUrl: '',
      }
    }
    catch (e){
      Pop.error(e);
    }
  }

  async function deletePost() {
    try {
      const wantsToDelete = await Pop.confirm('You sure you want to delete this post?');
      if (!wantsToDelete) return;

      await postService.deletePost(props.postProp.id);
    }
    catch (e){
      Pop.error(e);
    }
  }
</script>


<template>
  <div class="p-3 card-custom">
    <div class="d-flex">
      <router-link v-if="route.name === 'Home'" :to="{ name: 'ProfileDetails', params: { profileId: postProp.creatorId } }" :title="`Go to ${postProp.creator.name}'s profile page!'`">
        <img class="img-fluid me-2 creator-img" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
      <img v-else class="img-fluid creator-img" :src="postProp.creator.picture" :alt="postProp.creator.name">
      <div>
        <p>{{ postProp.creator.name }}<br>{{ postProp.createdAt.toLocaleDateString() }} {{ `${postProp.creator.graduated ? '🎓' : ''}` }}</p>
      </div>
      <div v-if="account && account.id === postProp.creatorId" class="ms-auto dropdown-center">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ...
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item text-center" @click="toggler()" type="button">Edit <i class="fa-solid fa-pen fa-lg" style="color: #74C0FC;"></i></button></li>
          <li><button class="dropdown-item text-center" @click="deletePost()" type="button">Delete<i class="fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></button></li>
        </ul>
      </div>
    </div>
    <div class="actual">
      <div v-if="!toggle">
        <p>{{ postProp.body }}</p>
        <img class="img-post" :src="postProp.imgUrl" :alt="postProp.creator.name">
      </div>
      <div v-else>
        <form @submit.prevent="updatePost()" class="w-100 p-2">
          <textarea v-model="editablePostData.body" class="form-control" placeholder="Edit.." maxlength="300"></textarea>
          <div class="my-2">
            <input v-model="editablePostData.imgUrl" class="form-control special-input" type="url" placeholder="Edit Image...">
          </div>
          <div class="text-center">
            <button class="btn btn-outline-dark me-2" @click="toggler()" type="button">Cancel</button>
            <button class="btn btn-outline-dark">Save Changes</button>
          </div>
        </form>
      </div>

      <div class="text-end">
        <button v-if="account" @click="heartPost()" class="special-btn" type="button">
          <i v-if="postProp.likeIds.includes(account.id)" class="fa-solid fa-heart" style="color: #63E6BE;"></i>
          <i v-else class="fa-regular fa-heart" style="color: #63E6BE;"></i>
          {{ postProp.likes.length }}
        </button>
      </div>
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

  .img-post {
    height: 60dvh;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }

  .card-custom {
    background-color: rgb(224, 234, 242);
    box-shadow: 1px 1px 9px rgba(#333, 0.2);
  }

  p {
    margin: 0;
  }

  .special-btn {
    cursor: pointer;
    background: none;
    border: none;
  }

  .special-input {
    display: inline;
    width: fit-content;
  }

  textarea {
    resize: none;
  }
</style>