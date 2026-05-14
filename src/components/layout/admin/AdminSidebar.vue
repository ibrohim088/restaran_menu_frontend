<template>
  <div class="admin-sidebar bg-white border-end">
    <div class="p-3">
      <router-link v-for="link in menuLinks" :key="link.path" :to="link.path"
        class="nav-link d-flex align-items-center gap-3 py-3 px-3 rounded mb-1"
        :class="{ active: isActive(link.path) }">
        <component :is="link.icon" size="20" />
        <span>{{ link.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Home, Store, Tags, UtensilsCrossed, Users } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const menuLinks = computed(() => {
  const links = [
    { title: 'Dashboard', path: '/admin', icon: Home },
    { title: 'Restoranlar', path: '/admin/restaurants', icon: Store },
    { title: 'Kategoriyalar', path: '/admin/categories', icon: Tags },
    { title: 'Taomlar', path: '/admin/menu-items', icon: UtensilsCrossed }
  ]
  if (user.value?.role === 'superadmin') {
    links.push({ title: 'Adminlar', path: '/admin/admins', icon: Users })
  }
  return links
})

const isActive = (path) => route.path === path || route.path.startsWith(path + '/')
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: sticky;
  top: 56px;
}

.nav-link {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.active {
  background-color: #f1f5f9;
  color: #1e3a8a;
}
</style>