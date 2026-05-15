<template>
  <div class="menu-item-card card h-100 shadow-sm">
    <img v-if="showImage && imageUrl" :src="imageUrl" class="card-img-top" style="height:160px;object-fit:cover;"
      alt="Menu Item" @error="onImageError">
    <div v-else class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:160px;">
      <Utensils size="48" class="text-muted" />
    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start">
        <h6 class="card-title mb-1">{{ item.name }}</h6>
        <span v-if="item.isPopular" class="badge bg-warning d-flex align-items-center gap-1">
          <Flame size="14" /> Mashhur
        </span>
      </div>
      <p v-if="item.description" class="card-text text-muted small flex-grow-1">{{ item.description }}</p>

      <div class="d-flex justify-content-between align-items-end mt-auto gap-2">
        <div>
          <strong class="text-primary fs-5">{{ formatPrice(item.price) }}</strong>
          <div class="d-flex gap-2 align-items-center small text-muted">
            <span v-if="item.weight"><Scale size="12" /> {{ item.weight }}</span>
            <span v-if="item.calories">• {{ item.calories }}</span>
          </div>
        </div>
        <span :class="item.isAvailable ? 'badge bg-success' : 'badge bg-secondary'"
          class="d-flex align-items-center gap-1">
          <component :is="item.isAvailable ? CheckCircle2 : XCircle" size="14" />
          {{ item.isAvailable ? 'Mavjud' : "Yo'q" }}
        </span>
      </div>
    </div>

    <div class="card-footer d-flex gap-2">
      <button @click="emit('edit', item._id)"
        class="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1">
        <Pencil size="14" /> Tahrirlash
      </button>
      <button @click="emit('delete', item._id)"
        class="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center">
        <Trash2 size="14" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Flame, Utensils, CheckCircle2, XCircle, Pencil, Trash2, Scale } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'
import { formatPrice } from '@/utilities/formatters.js'

const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['edit', 'delete'])
const showImage = ref(true)
const imageUrl = computed(() => normalizeMediaUrl(props.item.imageUrl || props.item.image || ''))
const onImageError = () => { showImage.value = false }
</script>

<style scoped>
.menu-item-card { transition: all 0.2s ease; }
.menu-item-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,.12); }
</style>
