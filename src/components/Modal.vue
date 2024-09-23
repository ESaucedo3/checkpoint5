<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

  const account = computed(() => AppState.account)

  const editableAccountData = ref({
    name: '',
    coverImg: '',
    picture: '',
    class: '',
    graduated: false,
    github: '',
    linkedin: '',
    resume: '',
    bio: '',
  })

  onMounted(() => {
    editableAccountData.value = { ...AppState.account }
  })

  async function updateAccount() {
    try {
      await accountService.updateAccount(editableAccountData.value)
      Pop.success('Changes Saved!')
    }
    catch (e){
      Pop.error(e);
      logger.error(e)
    }
  } 
</script>


<template>
  <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header custom-header">
          <h1 class="modal-title fs-5 text-light" id="accountModalLabel">Edit Profile</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <section class="container-fluid">
            <form @submit.prevent="updateAccount()" class="row">
              <div class="col-12">
                <div class="position-relative">
                  <img class="cover-img" :src="account?.coverImg" alt="Account">
                  <img class="account-picture" :src="account?.picture" :alt="account?.name">
                </div>
              </div>
              <div class="col-12">
                <label class="form-label mt-5" for="accountName">Name</label>
                <input v-model="editableAccountData.name" class="form-control" name="accountName" id="accountName" placeholder="Name" maxlength="170" required>
              </div>
              <div class="col-12">
                <label class="form-label" for="accountCoverImg">Cover Image Url</label>
                <input v-model="editableAccountData.coverImg" class="form-control" type="url" name="accountCoverImg" id="accountCoverImg" placeholder="Image Url..." maxlength="170" required>
              </div>
              <div class="col-12">
                <label class="form-label" for="accountProfileImg">Profile Image Url</label>
                <input v-model="editableAccountData.picture" class="form-control" id="accountProfileImg" name="accountProfileImg" type="url" placeholder="Image Url..." required>
              </div>
              <div class="col-8 col-md-5">
                <label class="form-label my-3" for="accountClass">Attending Class</label>
                <input v-model="editableAccountData.class" class="form-control" id="accountClass" name="accountClass" placeholder="Class..." maxlength="150">
              </div>
              <div class="col-4 col-md-2 text-center text-md-end">
                <label class="form-label d-block my-3" for="accountGraduate">Graduated</label>
                <input v-model="editableAccountData.graduated" type="checkbox" id="accountGraduate" name="accountGraduate">
              </div>
              <div class="col-md-5">
                <label class="form-label my-3" for="accountGithub">Github</label>
                <input v-model="editableAccountData.github" class="form-control" type="url" id="accountGithub" name="accountGithub" placeholder="Github Url..." maxlength="100">
              </div>
              <div class="col-md-6">
                <label class="form-label my-3" for="accountLinkedin">LinkedIn</label>
                <input v-model="editableAccountData.linkedin" class="form-control" type="url" id="accountLinkedin" name="accountLinkedin" placeholder="LinkedIn Url..." maxlength="100">
              </div>
              <div class="col-md-6">
                <label class="form-label my-3" for="accountResume">Resume</label>
                <input v-model="editableAccountData.resume" class="form-control" type="url" id="accountResume" name="accountResume" placeholder="Resume Url...">
              </div>
              <div class="col-12">
                <label class="form-label mt-2" for="accountBio">Bio</label>
                <textarea v-model="editableAccountData.bio" class="form-control" id="accountBio" name="accountBio" placeholder="Tell us about yourself" rows="3" maxlength="400"></textarea>
              </div>
              <div class="col-12">
                <div class="text-center text-md-end mt-3">
                  <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                  <button class="btn btn-outline-info ms-3">Save changes</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .custom-header {
    background: rgb(6,218,202);
    background: radial-gradient(circle, rgba(6,218,202,1) 0%, rgba(4,45,76,1) 98%); 
  }

  .modal {
    --bs-modal-width: 600px
  }

  .cover-img {
    width: 100%;
    height: 13dvh;
    object-fit: cover;
  }

  .account-picture {
    height: 7dvh;
    border-radius: 50%;
    aspect-ratio: 1/1;
    position: absolute;
    left: 3px;
    top: 90px;
  }

  textarea {
    resize: none;
  }
</style>