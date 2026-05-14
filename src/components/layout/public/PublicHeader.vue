<template>
  <header class="public-header">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between py-3">
        <div class="d-flex align-items-center gap-2 text-primary">
          <Utensils size="24" />
          <h1 class="h4 mb-0">QR Menu</h1>
        </div>
        <div class="d-flex align-items-center gap-3">
          <router-link to="/" class="text-decoration-none text-dark d-flex align-items-center gap-1">
            <Home size="16" />
            Barcha Restoranlar
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Home, Utensils } from 'lucide-vue-next'
</script>

<style scoped>
.public-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>