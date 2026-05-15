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

    <div class="card-footer d-flex gap-2">
      <button @click.stop="editCategory(category._id)" class="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1">
        <Pencil size="14" /> Tahrirlash
      </button>
      <button @click.stop="confirmDelete(category._id)" class="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center">
        <Trash2 size="14" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Folder, Pencil, Trash2 } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({ category: { type: Object, required: true } })
const emit = defineEmits(['click', 'edit', 'delete'])
const showImage = ref(true)
const imageUrl = computed(() => normalizeMediaUrl(props.category.imageUrl || props.category.image || ''))
const onImageError = () => { showImage.value = false }
const editCategory = (id) => emit('edit', id)
const confirmDelete = (id) => emit('delete', id)
</script>

<style scoped>
.category-card { transition: all 0.2s ease; cursor: pointer; }
.category-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,.12); }
</style>
