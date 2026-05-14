<template>
  <div v-if="items.length" class="popular-section mb-5">
    <h3 class="mb-3 d-flex align-items-center gap-2 text-secondary">
      <Flame size="24" /> Mashhur taomlar
    </h3>
    <div class="row g-3">
      <div class="col-12 col-md-6 col-lg-4" v-for="item in items" :key="item._id">
        <MenuItemCard :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Flame } from 'lucide-vue-next'
import MenuItemCard from './MenuItemCard.vue'

defineProps({
  items: { type: Array, default: () => [] }
})
</script>