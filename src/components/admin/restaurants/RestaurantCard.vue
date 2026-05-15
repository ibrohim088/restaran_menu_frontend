<template>
  <div class="card h-100 shadow-sm restaurant-card" @click="emit('click')">
    <img v-if="showLogo && logoUrl" :src="logoUrl" class="card-img-top" style="height:180px;object-fit:cover;"
      @error="showLogo=false">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:180px;">
      <UtensilsCrossed size="56" class="text-muted" />
    </div>

    <div class="card-body">
      <h5 class="mb-1">{{ restaurant.name }}</h5>
      <p class="text-muted small d-flex align-items-center gap-1 mb-2">
        <MapPin size="14" /> {{ restaurant.address }}
      </p>
      <router-link :to="`/admin/restaurants/${restaurant._id}/qr`"
        class="btn btn-sm btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2" @click.stop>
        <QrCode size="16" /> QR Kod Ko'rish
      </router-link>
    </div>

    <div class="card-footer d-flex gap-2">
      <button class="btn btn-sm btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
        @click.stop="emit('edit', restaurant._id)">
        <Pencil size="14" /> Tahrirlash
      </button>
      <button class="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
        @click.stop="emit('delete', restaurant._id)">
        <Trash2 size="14" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { UtensilsCrossed, MapPin, QrCode, Pencil, Trash2 } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({ restaurant: Object })
const emit = defineEmits(['click', 'edit', 'delete'])
const showLogo = ref(true)
const logoUrl = computed(() => normalizeMediaUrl(props.restaurant.logoUrl || ''))
</script>
