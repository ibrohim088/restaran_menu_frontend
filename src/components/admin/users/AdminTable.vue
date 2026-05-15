<template>
  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th>Admin</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Status</th>
        <th>Amallar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="admin in admins" :key="admin._id">
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
              style="width:34px;height:34px;flex-shrink:0;">
              <User size="16" />
            </div>
            <span class="fw-semibold">{{ admin.fullName }}</span>
          </div>
        </td>
        <td>
          <span class="d-flex align-items-center gap-1 text-muted small">
            <Mail size="14" /> {{ admin.email }}
          </span>
        </td>
        <td>
          <span class="badge bg-primary d-inline-flex align-items-center gap-1">
            <Shield size="12" /> {{ admin.role }}
          </span>
        </td>
        <td>
          <span :class="admin.isActive ? 'badge bg-success' : 'badge bg-secondary'"
            class="d-inline-flex align-items-center gap-1">
            <component :is="admin.isActive ? CheckCircle2 : XCircle" size="12" />
            {{ admin.isActive ? 'Faol' : 'Faolsiz' }}
          </span>
        </td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-warning d-flex align-items-center gap-1"
              @click="$emit('toggle', admin)" :title="admin.isActive ? 'Bloklash' : 'Faollashtirish'">
              <component :is="admin.isActive ? UserX : UserCheck" size="14" />
            </button>
            <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              @click="$emit('remove', admin._id)" title="O'chirish">
              <Trash2 size="14" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { User, Mail, Shield, CheckCircle2, XCircle, UserX, UserCheck, Trash2 } from 'lucide-vue-next'
defineProps({ admins: Array })
defineEmits(['toggle', 'remove'])
</script>
