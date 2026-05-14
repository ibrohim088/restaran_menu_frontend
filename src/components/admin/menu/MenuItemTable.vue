<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Rasm</th>
        <th>Nomi</th>
        <th>Narx</th>
        <th>Holati</th>
        <th>Amallar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>
          <img :src="normalizeMediaUrl(item.imageUrl)"
            style="width:60px; height:60px; object-fit:cover; border-radius:6px;" v-if="item.imageUrl">
        </td>
        <td>{{ item.name }}</td>
        <td><strong>{{ item.price.toLocaleString() }} so‘m</strong></td>
        <td>
          <span :class="item.isAvailable ? 'badge bg-success' : 'badge bg-secondary'">
            {{ item.isAvailable ? 'Mavjud' : 'Yo‘q' }}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-2" @click="$emit('edit', item._id)">Tahrir</button>
          <button class="btn btn-sm btn-outline-secondary me-2" @click="$emit('toggle', item._id)">Toggle</button>
          <button class="btn btn-sm btn-danger" @click="$emit('delete', item._id)">O‘chirish</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { normalizeMediaUrl } from '@/utilities/image.js'

defineProps({ items: Array })
defineEmits(['edit', 'delete', 'toggle'])
</script>