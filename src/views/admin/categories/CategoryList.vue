<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="d-flex align-items-center gap-2 mb-0">
        <Tags size="26" /> Kategoriyalar
      </h2>
      <button class="btn btn-primary d-flex align-items-center gap-2" @click="openCreateModal">
        <FolderPlus size="18" /> Yangi Kategoriya
      </button>
    </div>

    <div v-if="!currentRestaurantId" class="alert alert-warning">
      Kategoriyalarni ko'rish uchun avval <strong>Restoranlar</strong> sahifasidan restoran tanlang.
    </div>

    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner />
    </div>

    <CategoryTable v-if="currentRestaurantId" :categories="categories" @edit="editCategory" @delete="deleteCategory"
      @toggle="toggleCategory" />

    <BaseModal :title="editingCategory ? 'Kategoriyani Tahrirlash' : 'Yangi Kategoriya'" :visible="showCreateModal"
      @close="closeModal">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Kategoriya nomi <span class="text-danger">*</span></label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Tavsif</label>
          <textarea v-model="form.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Rasm yuklash</label>
          <input type="file" class="form-control" @change="handleImageUpload" accept="image/*" />
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" style="max-height:120px; border-radius:8px;" />
          </div>
        </div>
        <div v-if="formError" class="alert alert-danger">{{ formError }}</div>
        <button type="submit" class="btn btn-primary w-100" :disabled="saving">
          {{ saving ? 'Saqlanmoqda...' : 'Saqlash' }}
        </button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Tags, FolderPlus } from 'lucide-vue-next'
import apiClient from '@/api/client'
import { useCategoryStore } from '@/stores/category'
import CategoryTable from '@/components/admin/categories/CategoryTable.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const categoryStore = useCategoryStore()

const categories = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const editingCategory = ref(null)
const currentRestaurantId = ref(route.query.restaurantId || '')
const form = ref({ name: '', description: '', image: null })
const imagePreview = ref('')
const formError = ref('')

const loadCategories = async () => {
  if (!currentRestaurantId.value) return
  loading.value = true
  await categoryStore.fetchCategories(currentRestaurantId.value)
  categories.value = categoryStore.categories
  loading.value = false
}

onMounted(loadCategories)

const openCreateModal = () => {
  if (!currentRestaurantId.value) {
    alert("Avval URL da restaurantId bo'lishi kerak. Restoranlar sahifasidan kiring.")
    return
  }
  editingCategory.value = null
  form.value = { name: '', description: '', image: null }
  imagePreview.value = ''
  formError.value = ''
  showCreateModal.value = true
}

const editCategory = (cat) => {
  editingCategory.value = { ...cat }
  form.value = { name: cat.name || '', description: cat.description || '', image: null }
  imagePreview.value = cat.imageUrl || ''
  formError.value = ''
  showCreateModal.value = true
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  form.value.image = file
  imagePreview.value = URL.createObjectURL(file)
}

const handleSubmit = async () => {
  saving.value = true
  formError.value = ''
  try {
    const fd = new FormData()
    fd.append('name', form.value.name)
    if (form.value.description) fd.append('description', form.value.description)
    if (form.value.image) fd.append('image', form.value.image)

    if (editingCategory.value) {
      await categoryStore.updateCategory(editingCategory.value._id, fd)
    } else {
      await categoryStore.createCategory(currentRestaurantId.value, fd)
    }

    closeModal()
    await loadCategories()
  } catch (err) {
    formError.value = err.response?.data?.message || err.message || 'Xatolik yuz berdi'
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return
  await categoryStore.deleteCategory(id)
  categories.value = categories.value.filter(c => c._id !== id)
}

const toggleCategory = async (id) => {
  try {
    await apiClient.patch(`/categories/${id}/toggle`)
    await loadCategories()
  } catch (err) {
    alert('Xatolik yuz berdi')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingCategory.value = null
}
</script>