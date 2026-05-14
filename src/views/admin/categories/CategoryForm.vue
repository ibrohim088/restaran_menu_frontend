<template>
  <div>
    <div class="d-flex align-items-center gap-3 mb-4">
      <button class="btn btn-outline-secondary btn-sm" @click="router.back()">← Orqaga</button>
      <h1 class="mb-0">{{ isEdit ? 'Kategoriyani Tahrirlash' : 'Yangi Kategoriya' }}</h1>
    </div>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Restoran <span class="text-danger">*</span></label>
            <select v-model="form.restaurantId" class="form-select" required :disabled="isEdit">
              <option value="">-- Tanlang --</option>
              <option v-for="r in restaurantStore.restaurants" :key="r._id" :value="r._id">
                {{ r.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Kategoriya nomi <span class="text-danger">*</span></label>
            <input v-model="form.name" type="text" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Tavsif</label>
            <textarea v-model="form.description" class="form-control" rows="3"></textarea>
          </div>

          <div class="mb-4">
            <label class="form-label">Rasm yuklash</label>
            <input type="file" class="form-control" @change="handleImageUpload" accept="image/*" />
          </div>

          <div v-if="error" class="alert alert-danger">{{ error }}</div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Saqlanmoqda...' : 'Saqlash' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import { useRestaurantStore } from '@/stores/restaurant'
import apiClient from '@/api/client'

const router = useRouter()
const route = useRoute()
const categoryStore = useCategoryStore()
const restaurantStore = useRestaurantStore()

const isEdit = ref(!!route.params.id)
const loading = ref(false)
const error = ref('')

const form = ref({
  restaurantId: '',
  name: '',
  description: '',
  image: null
})

onMounted(async () => {
  await restaurantStore.fetchRestaurants()
  if (isEdit.value) {
    try {
      const res = await apiClient.get(`/categories/${route.params.id}`)
      const c = res.data.data
      form.value.name = c.name || ''
      form.value.description = c.description || ''
      form.value.restaurantId = c.restaurantId || ''
    } catch (err) {
      error.value = "Kategoriya ma'lumotlarini yuklashda xatolik"
    }
  }
})

const handleImageUpload = (e) => { form.value.image = e.target.files[0] }

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    const fd = new FormData()
    fd.append('name', form.value.name)
    fd.append('restaurantId', form.value.restaurantId)
    if (form.value.description) fd.append('description', form.value.description)
    if (form.value.image) fd.append('image', form.value.image)

    if (isEdit.value) {
      await categoryStore.updateCategory(route.params.id, fd)
    } else {
      await categoryStore.createCategory(form.value.restaurantId, fd)
    }
    router.push('/admin/categories')
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>
