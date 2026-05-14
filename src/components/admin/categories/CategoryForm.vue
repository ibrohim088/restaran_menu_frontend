<template>
  <form @submit.prevent="saveCategory" enctype="multipart/form-data">
    <BaseInput v-model="form.name" label="Kategoriya Nomi" required />
    <BaseInput v-model="form.description" label="Tavsif" type="textarea" />

    <div class="mb-3">
      <label class="form-label">Rasm</label>
      <input type="file" @change="handleImage" accept="image/*" class="form-control" />
      <img v-if="previewImage" :src="previewImage" class="mt-2 img-thumbnail" style="max-height: 150px;">
    </div>

    <button type="submit" class="btn btn-success w-100" :disabled="loading">
      {{ loading ? 'Saqlanmoqda...' : editing ? 'Yangilash' : 'Yaratish' }}
    </button>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { createCategory, updateCategory } from '@/api/services/categoryService'
import BaseInput from '@/components/common/BaseInput.vue'

const props = defineProps({
  category: Object,
  restaurantId: String
})

const emit = defineEmits(['saved'])

const editing = ref(!!props.category)
const loading = ref(false)

const form = ref({
  name: '',
  description: '',
  restaurantId: props.restaurantId
})

const imageFile = ref(null)
const previewImage = ref(null)

if (props.category) {
  form.value = { ...props.category }
}

const handleImage = (e) => {
  imageFile.value = e.target.files[0]
  previewImage.value = URL.createObjectURL(imageFile.value)
}

const saveCategory = async () => {
  loading.value = true
  const formData = new FormData()

  formData.append('restaurantId', form.value.restaurantId)
  formData.append('name', form.value.name)
  if (form.value.description) formData.append('description', form.value.description)
  if (imageFile.value) formData.append('image', imageFile.value)

  try {
    if (editing.value) {
      await updateCategory(form.value._id, formData)
    } else {
      await createCategory(form.value.restaurantId, formData)
    }
    emit('saved')
  } catch (err) {
    alert('Xatolik: ' + err.response?.data?.message)
  } finally {
    loading.value = false
  }
}
</script>