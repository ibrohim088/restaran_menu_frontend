<template>
  <div class="menu-item-card card h-100">
    <img v-if="showImage && imageUrl" :src="imageUrl" class="card-img-top" style="height: 160px; object-fit: cover;"
      alt="" @error="onImageError">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 160px;">
      <Soup size="48" class="text-muted" />
    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start">
        <h6 class="card-title mb-1">{{ item.name }}</h6>
        <span v-if="item.isPopular" class="badge bg-warning d-flex align-items-center gap-1">
          <Flame size="16" /> Mashhur
        </span>
      </div>

      <p v-if="item.description" class="card-text text-muted small flex-grow-1">
        {{ item.description }}
      </p>

      <div class="d-flex justify-content-between align-items-end mt-auto gap-2">
        <div>
          <strong class="text-primary fs-5">{{ item.price?.toLocaleString() }} so'm</strong>
          <div class="d-flex gap-2 align-items-center small text-muted">
            <span v-if="item.weight">{{ item.weight }}</span>
            <span v-if="item.calories">• {{ item.calories }}</span>
          </div>
        </div>
        <span :class="item.isAvailable ? 'badge bg-success' : 'badge bg-secondary'">
          <component :is="item.isAvailable ? CheckCircle2 : XCircle" size="16" class="me-1" />
          {{ item.isAvailable ? 'Mavjud' : 'Yo‘q' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Flame, Soup, CheckCircle2, XCircle } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

defineProps({
  item: { type: Object, required: true }
})

const showImage = ref(true)
const imageUrl = computed(() => normalizeMediaUrl(item.imageUrl || item.image || item.photo || ''))
const onImageError = () => { showImage.value = false }
</script>

<style scoped>
.menu-item-card {
  transition: all 0.2s ease;
}

.menu-item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
</style>