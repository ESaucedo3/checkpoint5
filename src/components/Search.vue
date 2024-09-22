<script setup>
import { profileService } from '@/services/ProfileService.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';

  const editableQuery = ref('')

  async function searchUsers() {
    try {
      await profileService.searchUsers(editableQuery.value);
      editableQuery.value = ''
    }
    catch (error){
      Pop.error(error);
    }
  }
</script>


<template>
  <span class="me-2 d-flex ms-auto">
    <input v-model="editableQuery" class="form-control" type="search" placeholder="Search..." name="userAccount" id="userAcccount">
    <span @click="searchUsers()" class="align-self-center selectable fs-4">🔎</span>
  </span>
</template>

<style lang="scss" scoped>

</style>