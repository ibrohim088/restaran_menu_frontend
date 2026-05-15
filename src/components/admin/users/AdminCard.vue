<template>
  <div class="card p-3">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
          style="width:38px;height:38px;flex-shrink:0;">
          <User size="18" />
        </div>
        <div>
          <h6 class="mb-0">{{ admin.fullName }}</h6>
          <small class="text-muted d-flex align-items-center gap-1">
            <Mail size="12" /> {{ admin.email }}
          </small>
        </div>
      </div>
      <span class="badge bg-info">{{ admin.role }}</span>
    </div>
  </div>
</template>

<script setup>
import { User, Mail } from 'lucide-vue-next'
defineProps({ admin: { type: Object, required: true } })
</script>
