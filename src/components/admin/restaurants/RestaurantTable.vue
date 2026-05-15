<template>
  <div class="restaurant-table" style="overflow-x:auto;">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>Nomi</th>
          <th>Manzil</th>
          <th>Telefon</th>
          <th>Holati</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in restaurants" :key="restaurant._id">
          <td class="fw-semibold">{{ restaurant.name }}</td>
          <td>
            <span class="d-flex align-items-center gap-1 text-muted small">
              <MapPin size="14" /> {{ restaurant.address }}
            </span>
          </td>
          <td>
            <span class="d-flex align-items-center gap-1 small">
              <Phone size="14" /> {{ restaurant.phone || '—' }}
            </span>
          </td>
          <td>
            <span :class="restaurant.isActive ? 'badge bg-success' : 'badge bg-secondary'"
              class="d-inline-flex align-items-center gap-1">
              <component :is="restaurant.isActive ? CheckCircle2 : XCircle" size="12" />
              {{ restaurant.isActive ? 'Faol' : 'Faol emas' }}
            </span>
          </td>
          <td>
            <div class="d-flex gap-1">
              <button @click="emit('edit', restaurant._id)"
                class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1" title="Tahrirlash">
                <Pencil size="14" />
              </button>
              <button @click="emit('delete', restaurant._id)"
                class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1" title="O'chirish">
                <Trash2 size="14" />
              </button>
              <router-link :to="`/admin/restaurants/${restaurant._id}/qr`"
                class="btn btn-sm btn-outline-info d-flex align-items-center gap-1" title="QR Kod">
                <QrCode size="14" />
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { MapPin, Phone, CheckCircle2, XCircle, Pencil, Trash2, QrCode } from 'lucide-vue-next'
const props = defineProps({ restaurants: { type: Array, default: () => [] } })
const emit = defineEmits(['edit', 'delete'])
</script>
