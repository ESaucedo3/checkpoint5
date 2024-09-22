<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';

  const account = computed(() => AppState.account);
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
            <form class="row">
              <div class="col-12">
                <div class="position-relative">
                  <img class="cover-img" :src="account?.coverImg" alt="Account">
                  <img class="account-picture" :src="account?.picture" :alt="account?.name">
                </div>
              </div>
              <div class="col-12">
                <div class="mt-5">
                  <label class="form-label">Cover Image Url</label>
                  <input class="form-control" type="url" placeholder="Image Url..">
                </div>
              </div>
              <div class="col-6">s</div>
              <div class="col-6">d</div>
              <div class="col-6">f</div>
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
</style>