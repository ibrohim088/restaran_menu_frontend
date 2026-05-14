<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item">
      <Home size="18" />
      <small>Asosiy</small>
    </router-link>
  </nav>
</template>

<script setup>
import { Home } from 'lucide-vue-next'
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-item {
  text-align: center;
  color: #64748b;
  text-decoration: none;
  font-size: 0.8rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
</style>