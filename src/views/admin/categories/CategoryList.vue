<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h2>Kategoriyalar</h2>
      <button class="btn btn-primary" @click="showCreateModal = true">
        + Yangi Kategoriya
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner />
    </div>

    <CategoryTable :categories="categories" @edit="editCategory" @delete="deleteCategory" @toggle="toggleCategory" />
  </div>

  <!-- Create/Edit Modal -->
  <BaseModal :title="editingCategory ? 'Kategoriyani Tahrirlash' : 'Yangi Kategoriya'" :visible="showCreateModal"
    @close="closeModal">
    <CategoryForm :category="editingCategory" :restaurantId="currentRestaurantId" @saved="onCategorySaved" />
  </BaseModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/api/client'
import { useCategoryStore } from '@/stores/category'
import CategoryTable from '@/components/admin/categories/CategoryTable.vue'
import CategoryForm from '@/components/admin/categories/CategoryForm.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const categoryStore = useCategoryStore()

const categories = ref([])
const loading = ref(false)
const showCreateModal = ref(false)
const editingCategory = ref(null)
const currentRestaurantId = ref(route.query.restaurantId || '')

onMounted(async () => {
  if (currentRestaurantId.value) {
    loading.value = true
    await categoryStore.fetchCategories(currentRestaurantId.value)
    categories.value = categoryStore.categories
    loading.value = false
  }
})

const editCategory = (cat) => {
  editingCategory.value = { ...cat }
  showCreateModal.value = true
}

const deleteCategory = async (id) => {
  if (confirm('Haqiqatan ham o‘chirmoqchimisiz?')) {
    await categoryStore.deleteCategory(id)
    categories.value = categories.value.filter(c => c._id !== id)
  }
}

const toggleCategory = async (id) => {
  try {
    await apiClient.patch(`/categories/${id}/toggle`)
    await categoryStore.fetchCategories(currentRestaurantId.value)
    categories.value = categoryStore.categories
  } catch (err) {
    console.error(err)
    alert('Kategoriya holatini o‘zgartirishda xatolik yuz berdi')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingCategory.value = null
}

const onCategorySaved = () => {
  closeModal()
  // Refresh qilish
  categoryStore.fetchCategories(currentRestaurantId.value)
}
</script>