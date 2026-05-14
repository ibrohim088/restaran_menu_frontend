<template>
  <div class="card h-100 shadow-sm restaurant-card" @click="emit('click')">
    <img v-if="restaurant.logoUrl" :src="normalizeMediaUrl(restaurant.logoUrl)" class="card-img-top"
      style="height: 180px; object-fit: cover;">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 180px;">
      <span class="display-1 text-muted">🍽️</span>
    </div>
    <div class="card-body">
      <h5>{{ restaurant.name }}</h5>
      <p class="text-muted small">{{ restaurant.address }}</p>
      <router-link :to="`/admin/restaurants/${restaurant._id}/qr`" class="btn btn-sm btn-outline-primary w-100 mt-2"
        @click.stop>
        QR Kod Ko'rish
      </router-link>
    </div>
    <div class="card-footer d-flex gap-2">
      <button class="btn btn-sm btn-outline-secondary flex-grow-1" @click.stop="emit('edit', restaurant._id)">
        ✏️ Tahrirlash
      </button>
      <button class="btn btn-sm btn-outline-danger" @click.stop="emit('delete', restaurant._id)">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({ restaurant: Object })
const emit = defineEmits(['click', 'edit', 'delete'])
</script>