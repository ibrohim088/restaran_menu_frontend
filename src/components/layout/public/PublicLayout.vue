<template>
  <div class="public-layout">
    <PublicHeader />
    
    <main class="main-content">
      <router-view />
    </main>

    <BottomNav />
  </div>
</template>

<script setup>
import PublicHeader from './PublicHeader.vue'
import BottomNav from './BottomNav.vue'
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  background-color: #f8fafc;
}

.main-content {
  padding-bottom: 70px; /* BottomNav uchun joy */
}
</style>