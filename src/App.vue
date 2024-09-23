<script setup>
  import Navbar from './components/Navbar.vue';
  import AdCard from './components/AdCard.vue';
import Login from './components/Login.vue';
import Modal from './components/Modal.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <section class="container-fluid">
      <div class="row">
        <div class="col-2 mobile login-design">
          <Login />
        </div>

        <div class="col-md-8 main-design">
          <router-view />
        </div>

        <div class="col-2 mobile main-design">
          <AdCard />
        </div>
      </div>
    </section>
  </main>
  <Modal />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
:root {
  --main-height: calc(100vh - 32px - 64px);
}

.login-design {
  background-color: #FFFFFF;
  border-right: 1px solid #333;
}

.main-design {
  background-color: rgb(247, 247, 247);
}

@media (width < 600px) {
  .mobile {
    display: none;
  }
}
</style>
