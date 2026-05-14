<template>
  <div class="card p-3">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h6 class="mb-0">{{ admin.fullName }}</h6>
        <small class="text-muted">{{ admin.email }}</small>
      </div>
      <span class="badge bg-info">{{ admin.role }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps({ admin: { type: Object, required: true } })
</script>
