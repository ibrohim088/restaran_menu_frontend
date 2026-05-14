<template>
  <div class="category-card card h-100 shadow-sm" @click="emit('click')">
    <img v-if="showImage && imageUrl" :src="imageUrl" class="card-img-top" style="height: 180px; object-fit: cover;"
      alt="Category" @error="onImageError">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 180px;">
      <Folder size="48" class="text-muted" />
    </div>

    <div class="card-body">
      <h5 class="card-title">{{ category.name }}</h5>
      <p v-if="category.description" class="card-text text-muted small">
        {{ category.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Folder } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const showImage = ref(true)

const imageUrl = computed(() => {
  return normalizeMediaUrl(props.category.imageUrl || props.category.image || props.category.photo || '')
})

const onImageError = () => {
  showImage.value = false
}
</script>

<style scoped>
.category-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
</style>