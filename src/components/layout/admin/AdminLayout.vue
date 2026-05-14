<template>
  <div class="admin-layout">
    <AdminNavbar />
    
    <div class="d-flex">
      <AdminSidebar v-if="isDesktop" />
      
      <main class="flex-grow-1 p-4" style="background: #f8fafc; min-height: calc(100vh - 56px);">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AdminNavbar from './AdminNavbar.vue'
import AdminSidebar from './AdminSidebar.vue'

const isDesktop = ref(window.innerWidth >= 992)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 992
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>