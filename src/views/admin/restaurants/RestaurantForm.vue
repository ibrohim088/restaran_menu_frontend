<template>
  <div class="card shadow-sm">
    <div class="card-header d-flex align-items-center gap-2">
      <component :is="isEdit ? Pencil : Plus" size="20" />
      <h4 class="mb-0">{{ isEdit ? 'Restoranni Tahrirlash' : "Yangi Restoran Qo'shish" }}</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="saveRestaurant" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-6">
            <BaseInput v-model="form.name" label="Restoran Nomi" required />
            <BaseInput v-model="form.address" label="Manzil" required />
            <BaseInput v-model="form.phone" label="Telefon" />
            <BaseInput v-model="form.workingHours" label="Ish vaqti" placeholder="09:00 - 23:00" />
          </div>
          <div class="col-md-6">
            <BaseInput v-model="form.instagram" label="Instagram" placeholder="@username" />
            <BaseInput v-model="form.telegram" label="Telegram" placeholder="@username" />
            <BaseInput v-model="form.description" label="Tavsif" type="textarea" />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <ImageIcon size="16" /> Logo
          </label>
          <input type="file" @change="handleLogo" accept="image/*" class="form-control" />
          <img v-if="previewLogo" :src="previewLogo" class="mt-2" style="max-height:120px;border-radius:8px;">
        </div>

        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <ImageIcon size="16" /> Muqova rasmi (Cover)
          </label>
          <input type="file" @change="handleCover" accept="image/*" class="form-control" />
          <img v-if="previewCover" :src="previewCover" class="mt-2" style="max-height:160px;border-radius:8px;">
        </div>

        <div class="d-flex gap-3">
          <button type="submit" class="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            :disabled="loading">
            <Save size="16" /> {{ loading ? 'Saqlanmoqda...' : isEdit ? 'Yangilash' : 'Yaratish' }}
          </button>
          <router-link to="/admin/restaurants" class="btn btn-secondary d-flex align-items-center gap-2">
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
import { Pencil, Plus, Image as ImageIcon, Save, X } from 'lucide-vue-next'
import { createRestaurant, updateRestaurant, getRestaurantById } from '@/api/services/restaurantService'
import BaseInput from '@/components/common/BaseInput.vue'

const route = useRoute()
const router = useRouter()

const isEdit = ref(!!route.params.id)
const loading = ref(false)
const form = ref({ name: '', address: '', phone: '', description: '', instagram: '', telegram: '', workingHours: '' })
const logoFile = ref(null)
const coverFile = ref(null)
const previewLogo = ref(null)
const previewCover = ref(null)

const handleLogo = (e) => { logoFile.value = e.target.files[0]; previewLogo.value = URL.createObjectURL(logoFile.value) }
const handleCover = (e) => { coverFile.value = e.target.files[0]; previewCover.value = URL.createObjectURL(coverFile.value) }

const saveRestaurant = async () => {
  loading.value = true
  const formData = new FormData()
  Object.keys(form.value).forEach(key => { if (form.value[key]) formData.append(key, form.value[key]) })
  if (logoFile.value) formData.append('logo', logoFile.value)
  if (coverFile.value) formData.append('cover', coverFile.value)
  try {
    if (isEdit.value) { await updateRestaurant(route.params.id, formData) }
    else { await createRestaurant(formData) }
    router.push('/admin/restaurants')
  } catch (err) { alert('Xatolik: ' + (err.response?.data?.message || err.message)) }
  finally { loading.value = false }
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      const res = await getRestaurantById(route.params.id)
      Object.assign(form.value, res.data.data)
    } catch (err) { console.error(err) }
  }
})
</script>
