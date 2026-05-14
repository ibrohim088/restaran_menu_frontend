<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h2>Barcha Adminlar</h2>
      <button class="btn btn-primary" @click="showCreateModal = true">+ Yangi Admin</button>
    </div>

    <div v-if="loading" class="text-center py-5">Loading...</div>

    <AdminTable :admins="admins" @toggle="toggleAdmin" @remove="deleteAdmin" />

    <BaseModal title="Yangi Admin" :visible="showCreateModal" @close="closeModal">
      <form @submit.prevent="handleCreate">
        <div class="mb-3">
          <label class="form-label">To‘liq ism</label>
          <input v-model="form.fullName" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Parol</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Roli</label>
          <select v-model="form.role" class="form-select" required>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="saving">
          {{ saving ? 'Saqlanmoqda...' : 'Saqlash' }}
        </button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import apiClient from '@/api/client'
import AdminTable from '@/components/admin/users/AdminTable.vue'
import BaseModal from '@/components/common/BaseModal.vue'

const admins = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const form = ref({ fullName: '', email: '', password: '', role: 'admin' })

const loadAdmins = async () => {
  loading.value = true
  try {
    const res = await apiClient.get('/admins')
    admins.value = res.data.data || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadAdmins)

const closeModal = () => {
  showCreateModal.value = false
  form.value = { fullName: '', email: '', password: '', role: 'admin' }
}

const handleCreate = async () => {
  saving.value = true
  try {
    const res = await apiClient.post('/admins', {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      role: form.value.role
    })
    admins.value.unshift(res.data.data)
    closeModal()
  } catch (err) {
    console.error(err)
    alert('Admin yaratishda xatolik yuz berdi')
  } finally {
    saving.value = false
  }
}

const toggleAdmin = async (admin) => {
  try {
    await apiClient.patch(`/admins/${admin._id}/toggle`)
    admins.value = admins.value.map(a => a._id === admin._id ? { ...a, isActive: !a.isActive } : a)
  } catch (err) {
    console.error(err)
    alert('Admin holatini o‘zgartirishda xatolik yuz berdi')
  }
}

const deleteAdmin = async (id) => {
  if (!confirm('O‘chirmoqchimisiz?')) return
  try {
    await apiClient.delete(`/admins/${id}`)
    admins.value = admins.value.filter(a => a._id !== id)
  } catch (err) {
    console.error(err)
    alert('Admin o‘chirishda xatolik yuz berdi')
  }
}
</script>