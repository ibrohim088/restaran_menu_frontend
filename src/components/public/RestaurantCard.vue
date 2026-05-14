<template>
  <div class="restaurant-card card h-100 shadow-sm" @click="emit('click')">
    <img v-if="showLogo && imageUrl" :src="imageUrl" class="card-img-top" style="height: 180px; object-fit: cover;"
      alt="Restaurant Logo" @error="onImageError">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 180px;">
      <Utensils size="48" class="text-muted" />
    </div>

    <div class="card-body">
      <h5 class="card-title mb-2">{{ restaurant.name || 'Restoran' }}</h5>
      <div class="mb-3 text-muted small d-flex align-items-center gap-2">
        <MapPin size="16" />
        <span>{{ restaurant.address || 'Manzil mavjud emas' }}</span>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2 text-primary small">
          <Phone size="16" />
          <span>{{ restaurant.phone || 'Telefon yo‘q' }}</span>
        </div>
        <span :class="restaurant.isActive ? 'badge bg-success' : 'badge bg-secondary'">
          {{ restaurant.isActive ? 'Ochiq' : 'Yopiq' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MapPin, Phone, Utensils } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

defineProps({
  restaurant: { type: Object, required: true }
})

const emit = defineEmits(['click'])
const showLogo = ref(true)

const imageUrl = computed(() => {
  return normalizeMediaUrl(restaurant.logoUrl || restaurant.logo || restaurant.image || restaurant.photo || '')
})

const onImageError = () => {
  showLogo.value = false
}
</script>

<style scoped>
.restaurant-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.restaurant-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}
</style>