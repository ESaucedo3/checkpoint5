<script setup>
  import { AppState } from '@/AppState.js';
  import { adService } from '@/services/AdService.js';
  import { logger } from '@/utils/Logger.js';
  import Pop from '@/utils/Pop.js';
  import { computed, onMounted } from 'vue';

  const ads = computed(() => AppState.ads);
  
  onMounted(() => {
    getAds()
  })

  async function getAds() {
    try {
      await adService.getAds();
    }
    catch (e){
      Pop.error(e);
      logger.error(e)
    }
  }
</script>


<template>
  <div class="p-1 sticky-top">
    <div v-for="ad in ads" :key="ad.title" class="mb-2">
      <img class="img-fluid rounded" :src="ad.square" alt="">
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>