<template>
  <div class="card h-100 shadow-sm restaurant-card border-0 overflow-hidden"
       @click="emit('click')">

    <!-- Rasm qismi - To'liqroq ko'rinish -->
    <div class="position-relative">
      <img 
        v-if="showLogo && logoUrl" 
        :src="logoUrl" 
        class="card-img-top restaurant-img"
        style="height: 400px; object-fit: cover;"
        @error="handleImageError"
      >

      <!-- Placeholder -->
      <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" 
           style="height: 220px;">
        <UtensilsCrossed size="52" class="text-muted" />
      </div>

      <!-- Status badge -->
      <span v-if="restaurant.isActive !== false" 
            class="badge bg-success position-absolute top-3 end-3 shadow-sm">
        Faol
      </span>
      <span v-else 
            class="badge bg-secondary position-absolute top-3 end-3 shadow-sm">
        Faolsiz
      </span>
    </div>

    <div class="card-body d-flex flex-column p-3">
      <h5 class="card-title fw-semibold mb-2 fs-6">{{ restaurant.name }}</h5>

      <p class="text-muted small d-flex align-items-center gap-2 mb-3">
        <MapPin size="16" class="flex-shrink-0" />
        {{ restaurant.address || 'Manzil kiritilmagan' }}
      </p>

      <!-- QR Kod tugmasi -->
      <router-link 
        :to="`/admin/restaurants/${restaurant._id}/qr`"
        class="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2 mb-3"
        @click.stop>
        <QrCode size="16" /> 
        QR Kodni Ko‘rish
      </router-link>

      <!-- Pastki tugmalar -->
      <div class="mt-auto d-flex gap-2">
        <button 
          class="btn btn-outline-secondary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2"
          @click.stop="emit('edit', restaurant._id)">
          <Pencil size="15" /> 
          Tahrirlash
        </button>
        
        <button 
          class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 px-3"
          @click.stop="emit('delete', restaurant._id)">
          <Trash2 size="15" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { UtensilsCrossed, MapPin, QrCode, Pencil, Trash2 } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'edit', 'delete'])

const showLogo = ref(true)

const logoUrl = computed(() => normalizeMediaUrl(props.restaurant.logoUrl || ''))

const handleImageError = () => {
  showLogo.value = false
}
</script>

<style scoped>
.restaurant-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
}

.restaurant-img {
  transition: transform 0.4s ease;
}

.card-body {
  padding: 1.1rem;
}

.card-title {
  font-size: 1.1rem;
  line-height: 1.35;
}

.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}

.btn {
  font-weight: 500;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.btn-sm {
  padding: 0.45rem 0.75rem;
}
</style>