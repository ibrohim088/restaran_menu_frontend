<template>
  <table class="table table-hover align-middle">
    <thead class="table-light">
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
          <img v-if="item.imageUrl" :src="normalizeMediaUrl(item.imageUrl)"
            style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
          <div v-else class="d-flex align-items-center justify-content-center bg-light rounded"
            style="width:60px;height:60px;">
            <Utensils size="22" class="text-muted" />
          </div>
        </td>
        <td class="fw-semibold">
          {{ item.name }}
          <span v-if="item.isPopular" class="badge bg-warning ms-1 d-inline-flex align-items-center gap-1">
            <Flame size="12" />
          </span>
        </td>
        <td><strong>{{ item.price?.toLocaleString() }} so'm</strong></td>
        <td>
          <span :class="item.isAvailable ? 'badge bg-success' : 'badge bg-secondary'"
            class="d-inline-flex align-items-center gap-1">
            <component :is="item.isAvailable ? CheckCircle2 : XCircle" size="12" />
            {{ item.isAvailable ? 'Mavjud' : "Yo'q" }}
          </span>
        </td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
              @click="$emit('edit', item._id)">
              <Pencil size="14" /> Tahrir
            </button>
            <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              @click="$emit('toggle', item._id)" :title="item.isAvailable ? 'Yopish' : 'Ochish'">
              <component :is="item.isAvailable ? ToggleRight : ToggleLeft" size="14" />
            </button>
            <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              @click="$emit('delete', item._id)">
              <Trash2 size="14" />
            </button>
            <button class="btn btn-primary flex-grow-1 btn-sm d-flex align-items-center justify-content-center gap-1"
              @click="$emit('detail', item)">
              <Utensils size="16" /> Batafsil
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { Utensils, Flame, CheckCircle2, XCircle, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'
defineProps({ items: Array })
defineEmits(['edit', 'delete', 'toggle', 'detail'])
</script>
