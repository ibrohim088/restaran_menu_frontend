<template>
  <div class="card shadow-sm">
    <div class="card-header d-flex align-items-center gap-2">
      <component :is="isEdit ? Pencil : Plus" size="20" />
      <h4 class="mb-0">{{ isEdit ? 'Taomni Tahrirlash' : "Yangi Taom Qo'shish" }}</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="saveItem" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-8">
            <BaseInput v-model="form.name" label="Taom Nomi" required />
            <BaseInput v-model="form.description" label="Tavsif" type="textarea" />
            <BaseInput v-model="form.price" label="Narx (so'm)" type="number" required />
          </div>
          <div class="col-md-4">
            <BaseInput v-model="form.weight" label="Vazni (masalan: 250g)" />
            <BaseInput v-model="form.calories" label="Kaloriya" />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <ImageIcon size="16" /> Rasm
          </label>
          <input type="file" @change="handleImage" accept="image/*" class="form-control" />
          <img v-if="previewImage" :src="previewImage" class="mt-2 img-thumbnail" style="max-height:180px;">
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.isPopular" id="popular">
          <label class="form-check-label d-flex align-items-center gap-1" for="popular">
            <Flame size="16" class="text-warning" /> Mashhur taom
          </label>
        </div>

        <div class="d-flex gap-3">
          <button type="submit" class="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            :disabled="loading">
            <Save size="16" /> {{ loading ? 'Saqlanmoqda...' : isEdit ? 'Yangilash' : 'Yaratish' }}
          </button>
          <router-link to="/admin/menu-items"
            class="btn btn-secondary d-flex align-items-center gap-2">
            <X size="16" /> Bekor qilish
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Pencil, Plus, Image as ImageIcon, Flame, Save, X } from 'lucide-vue-next'
import { createMenuItem, updateMenuItem, getMenuItemById } from '@/api/services/menuService'
import BaseInput from '@/components/common/BaseInput.vue'

const route = useRoute()
const router = useRouter()

const isEdit = ref(!!route.params.id)
const loading = ref(false)

const form = ref({
  name: '', description: '', price: '', weight: '', calories: '',
  isPopular: false, categoryId: route.query.categoryId || ''
})

const imageFile = ref(null)
const previewImage = ref(null)

const handleImage = (e) => {
  imageFile.value = e.target.files[0]
  previewImage.value = URL.createObjectURL(imageFile.value)
}

const saveItem = async () => {
  if (!form.value.categoryId) { alert("Kategoriya tanlanmagan!"); return }
  loading.value = true
  const formData = new FormData()
  Object.keys(form.value).forEach(key => {
    if (form.value[key] !== null && form.value[key] !== undefined) formData.append(key, form.value[key])
  })
  if (imageFile.value) formData.append('image', imageFile.value)
  try {
    if (isEdit.value) {
      await updateMenuItem(route.params.id, formData)
    } else {
      await createMenuItem(form.value.categoryId, formData)
    }
    router.push(`/admin/menu-items?categoryId=${form.value.categoryId}`)
  } catch (err) {
    alert('Xatolik: ' + (err.response?.data?.message || err.message))
  } finally { loading.value = false }
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      const res = await getMenuItemById(route.params.id)
      Object.assign(form.value, res.data.data)
    } catch (err) { console.error(err) }
  }
})
</script>
