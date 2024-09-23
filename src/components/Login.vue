<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';

const identity = computed(() => AppState.identity)
const account = computed(() => AppState.account)

async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout()
}

</script>

<template>
  <div class="sticky-login">
    <div class="text-center" v-if="!identity">
      <h5>Click to login or sign up</h5>
      <button class="btn btn-outline-dark selectable lighten-30 text-uppercase" @click="login">
        Sign Up / Login
      </button>
    </div>

    <div v-else>
      <div class="dropdown">
        <div type="button" class="selectable no-select special-btn" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account?.picture">
            <img :src="account?.picture" alt="account photo" />
            <i v-if="account?.graduated" class="fa-solid fa-graduation-cap fa-lg graduate"></i>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="m-0">Fall 2024</p>
          <h5>{{ account?.name }}</h5>
          <div>
            <a :href="account?.github" target="_blank"><i class="fa-brands fa-github fa-lg"></i></a>
            <a :href="account?.linkedin" target="_blank"><i class="fa-brands fa-linkedin fa-lg mx-2"></i></a>
            <a :href="account?.resume" target="_blank"><i class="fa-solid fa-file fa-lg"></i></a>
          </div>
        </div>

        <div class="dropdown-menu dropdown-menu-start" aria-labelledby="authDropdown">
          <div v-if="account" class="list-group">
            <router-link :to="{ name: 'ProfileDetails', params: {profileId: account.id} }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  a {
    color: inherit;
    text-decoration: none;
    margin-bottom: .7rem;
    transition: all .6s;
    border-radius: 25%;

    &:hover {
      text-shadow: 3px 3px 11px rgb(111, 221, 221);
    }
  }

  .sticky-login {
    position: sticky;
    top: 35%;
    width: 100%;
  }

  img {
    height: 19dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: relative;
  }

  .special-btn {
    max-width: fit-content;
    margin: 0 auto;
    border-radius: 50%;
  }

  .graduate {
    background-color: aliceblue;
    padding: 1rem .3rem 1rem .3rem;
    border: 2px solid lightblue;
    border-radius: 50%;
    position: absolute;
    height: 3dvh;
    bottom: 10px;
    right: 10px;
  }
</style>
