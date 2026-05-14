<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h2>Taomlar</h2>
      <router-link :to="`/admin/menu-items/new?categoryId=${currentCategoryId}`" class="btn btn-primary">
        + Yangi Taom
      </router-link>
    </div>

    <div v-if="!currentCategoryId" class="alert alert-info">
      Kategoriya tanlang
    </div>

    <MenuItemTable :items="items" @edit="editItem" @delete="deleteItem" @toggle="toggleAvailability" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuItemStore } from '@/stores/menu'
import apiClient from '@/api/client'
import MenuItemTable from '@/components/admin/menu/MenuItemTable.vue'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuItemStore()

const items = ref([])
const currentCategoryId = ref(route.query.categoryId || '')

onMounted(async () => {
  if (currentCategoryId.value) {
    await menuStore.fetchMenuItems(currentCategoryId.value)
    items.value = menuStore.items
  }
})

const editItem = (id) => {
  router.push(`/admin/menu-items/edit/${id}`)
}

const deleteItem = async (id) => {
  if (!confirm('O‘chirmoqchimisiz?')) return
  try {
    await menuStore.deleteMenuItem(id)
    items.value = items.value.filter(item => item._id !== id)
  } catch (err) {
    console.error(err)
    alert('Taom o‘chirishda xatolik yuz berdi')
  }
}

const toggleAvailability = async (id) => {
  if (!currentCategoryId.value) {
    alert('Kategoriyani tanlang')
    return
  }
  try {
    await apiClient.patch(`/menu/${id}/toggle`)
    await menuStore.fetchMenuItems(currentCategoryId.value)
    items.value = menuStore.items
  } catch (err) {
    console.error(err)
    alert('Taom holatini o‘zgartirishda xatolik yuz berdi')
  }
}
</script>