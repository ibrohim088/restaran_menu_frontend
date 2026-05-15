<template>
  <div class="menu-item-card" @click="openDetail">
    <img :src="normalizeMediaUrl(item.imageUrl)" class="card-img" @error="handleImageError" />
    <div class="card-body">
      <h6 class="card-title">{{ item.name }}</h6>
      <p class="price">{{ item.price?.toLocaleString() }} so'm</p>

      <div class="d-flex justify-content-between align-items-center mt-2">
        <small v-if="item.weight" class="text-muted">{{ item.weight }}</small>
        <button class="btn btn-sm btn-outline-primary" @click.stop="openDetail">
          Batafsil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({ item: Object })
const emit = defineEmits(['detail'])

const openDetail = () => emit('detail', props.item)

const handleImageError = (e) => {
  e.target.src = '/placeholder-food.jpg'
}
</script>

<style scoped>
.menu-item-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  background: white;
}

.menu-item-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
</style>