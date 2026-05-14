<template>
  <div class="card shadow-sm">
    <div class="card-header">
      <h4>{{ isEdit ? 'Taomni Tahrirlash' : 'Yangi Taom Qo‘shish' }}</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="saveItem" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-8">
            <BaseInput v-model="form.name" label="Taom Nomi" required />
            <BaseInput v-model="form.description" label="Tavsif" type="textarea" />
            <BaseInput v-model="form.price" label="Narx (so‘m)" type="number" required />
          </div>
          <div class="col-md-4">
            <BaseInput v-model="form.weight" label="Vazni (masalan: 250g)" />
            <BaseInput v-model="form.calories" label="Kaloriya" />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Rasm</label>
          <input type="file" @change="handleImage" accept="image/*" class="form-control" />
          <img v-if="previewImage" :src="previewImage" class="mt-2 img-thumbnail" style="max-height: 180px;">
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.isPopular" id="popular">
          <label class="form-check-label" for="popular">Mashhur taom 🔥</label>
        </div>

        <div class="d-flex gap-3">
          <button type="submit" class="btn btn-primary flex-grow-1" :disabled="loading">
            {{ loading ? 'Saqlanmoqda...' : isEdit ? 'Yangilash' : 'Yaratish' }}
          </button>
          <router-link to="/admin/menu-items" class="btn btn-secondary">Bekor qilish</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createMenuItem, updateMenuItem, getMenuItemById } from '@/api/services/menuService'
import BaseInput from '@/components/common/BaseInput.vue'

const route = useRoute()
const router = useRouter()

const isEdit = ref(!!route.params.id)
const loading = ref(false)

const form = ref({
  name: '',
  description: '',
  price: '',
  weight: '',
  calories: '',
  isPopular: false,
  categoryId: route.query.categoryId || ''
})

const imageFile = ref(null)
const previewImage = ref(null)

const handleImage = (e) => {
  imageFile.value = e.target.files[0]
  previewImage.value = URL.createObjectURL(imageFile.value)
}

const saveItem = async () => {
  if (!form.value.categoryId) {
    alert("Kategoriya tanlanmagan!")
    return
  }

  loading.value = true
  const formData = new FormData()

  Object.keys(form.value).forEach(key => {
    if (form.value[key] !== null && form.value[key] !== undefined) {
      formData.append(key, form.value[key])
    }
  })

  if (imageFile.value) formData.append('image', imageFile.value)

  try {
    if (isEdit.value) {
      await updateMenuItem(route.params.id, formData)
    } else {
      await createMenuItem(formData)
    }
    router.push(`/admin/menu-items?categoryId=${form.value.categoryId}`)
  } catch (err) {
    alert('Xatolik: ' + (err.response?.data?.message || err.message))
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      const res = await getMenuItemById(route.params.id)
      const data = res.data.data
      Object.assign(form.value, data)
    } catch (err) {
      console.error(err)
    }
  }
})
</script>