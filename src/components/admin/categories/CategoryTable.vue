<template>
  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th>Rasm</th>
        <th>Nomi</th>
        <th>Tavsif</th>
        <th>Status</th>
        <th>Amallar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category._id">
        <td>
          <img v-if="category.imageUrl" :src="normalizeMediaUrl(category.imageUrl)"
            style="width:60px;height:60px;object-fit:cover;border-radius:8px;" />
          <div v-else class="d-flex align-items-center justify-content-center bg-light rounded"
            style="width:60px;height:60px;">
            <Folder size="24" class="text-muted" />
          </div>
        </td>
        <td class="fw-semibold">{{ category.name }}</td>
        <td class="text-muted small">{{ category.description }}</td>
        <td>
          <span :class="category.isActive ? 'badge bg-success' : 'badge bg-secondary'">
            {{ category.isActive ? 'Faol' : 'Faolsiz' }}
          </span>
        </td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
              @click="$emit('edit', category)">
              <Pencil size="14" /> Tahrir
            </button>
            <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              @click="$emit('toggle', category._id)">
              <ToggleLeft size="14" />
            </button>
            <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              @click="$emit('delete', category._id)">
              <Trash2 size="14" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { Folder, Pencil, Trash2, ToggleLeft } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'
defineProps({ categories: Array })
defineEmits(['edit', 'delete', 'toggle'])
</script>
