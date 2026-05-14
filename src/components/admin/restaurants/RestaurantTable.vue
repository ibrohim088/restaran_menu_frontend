<template>
  <div class="restaurant-table">
    <table class="table table-striped table-hover">
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
          <td>{{ restaurant.name }}</td>
          <td>{{ restaurant.address }}</td>
          <td>{{ restaurant.phone }}</td>
          <td>
            <span :class="restaurant.isActive ? 'badge bg-success' : 'badge bg-secondary'">
              {{ restaurant.isActive ? 'Faol' : 'Faol emas' }}
            </span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button @click="editRestaurant(restaurant._id)" class="btn btn-sm btn-outline-primary" title="Tahrirlash">
                ✏️
              </button>
              <button @click="confirmDelete(restaurant._id)" class="btn btn-sm btn-outline-danger" title="O'chirish">
                🗑️
              </button>
              <router-link :to="`/admin/restaurants/${restaurant._id}/qr`" class="btn btn-sm btn-outline-info"
                title="QR Kod">
                📱
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  restaurants: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete'])

const editRestaurant = (id) => {
  emit('edit', id)
}

const confirmDelete = (id) => {
  emit('delete', id)
}
</script>

<style scoped>
.restaurant-table {
  overflow-x: auto;
}

.btn-group .btn {
  margin-right: 2px;
}
</style>