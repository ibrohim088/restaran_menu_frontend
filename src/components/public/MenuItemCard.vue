<template>
  <div class="item-card" @click="openDetail">
    <img :src="normalizeMediaUrl(item.imageUrl)" class="item-img" alt=""
      @error="e => e.target.style.background = '#f0f0f0'" />
    <div class="item-body">
      <p class="item-name">
        {{ item.name }}
      </p>
      
      <p class="item-meta" v-if="item.weight">
        {{ `${item.weight}`.endsWith('g') ? `${item.weight}` : `${item.weight}g` }}
      </p>
      
      <p class="item-price">{{ item.price?.toLocaleString() }} so'm</p>
    </div>
    <button class="item-action" @click.stop="openDetail">
      <ChevronRight :size="18" color="#999" />
    </button>
  </div>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'
const props = defineProps({ item: Object })
const emit = defineEmits(['detail'])
const openDetail = () => emit('detail', props.item)
</script>

<style scoped>
.item-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.item-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f5f5f5;
}

.item-body {
  flex: 1;
  padding: 12px;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  margin: 0 0 3px;
  line-height: 1.3;
}

.item-meta {
  font-size: 12px;
  color: #bbb;
  margin: 0 0 5px;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.item-action {
  padding: 0 12px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>