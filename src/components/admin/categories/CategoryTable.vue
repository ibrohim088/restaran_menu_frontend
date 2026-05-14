<template>
  <table class="table table-hover">
    <thead>
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
            style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
        </td>
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
        <td>
          <span :class="category.isActive ? 'badge bg-success' : 'badge bg-secondary'">
            {{ category.isActive ? 'Faol' : 'Faolsiz' }}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-2" @click="$emit('edit', category)">Tahrir</button>
          <button class="btn btn-sm btn-outline-secondary me-2" @click="$emit('toggle', category._id)">Toggle</button>
          <button class="btn btn-sm btn-danger" @click="$emit('delete', category._id)">O‘chirish</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { normalizeMediaUrl } from '@/utilities/image.js'

defineProps({ categories: Array })
defineEmits(['edit', 'delete', 'toggle'])
</script>
