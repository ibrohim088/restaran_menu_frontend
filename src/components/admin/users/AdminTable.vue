<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Ism</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
        <th>Amallar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="admin in admins" :key="admin._id">
        <td>{{ admin.fullName }}</td>
        <td>{{ admin.email }}</td>
        <td><span class="badge bg-primary">{{ admin.role }}</span></td>
        <td :class="admin.isActive ? 'text-success' : 'text-danger'">
          {{ admin.isActive ? 'Faol' : 'Faolsiz' }}
        </td>
        <td>
          <button class="btn btn-sm btn-outline-warning me-2" @click="toggle(admin)">Holati</button>
          <button class="btn btn-sm btn-outline-danger" @click="remove(admin._id)">O‘chirish</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ admins: Array })
defineEmits(['toggle', 'remove'])
</script>