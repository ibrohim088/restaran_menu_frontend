<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="d-flex align-items-center gap-2 mb-0">
        <Users size="26" /> Barcha Adminlar
      </h2>
      <button class="btn btn-primary d-flex align-items-center gap-2" @click="showCreateModal = true">
        <UserPlus size="18" /> Yangi Admin
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <AdminTable :admins="admins" @toggle="toggleAdmin" @remove="deleteAdmin" />

    <BaseModal title="Yangi Admin" :visible="showCreateModal" @close="closeModal">
      <form @submit.prevent="handleCreate">
        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <User size="15" /> To'liq ism
          </label>
          <input v-model="form.fullName" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <Mail size="15" /> Email
          </label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <Lock size="15" /> Parol
          </label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label d-flex align-items-center gap-1">
            <Shield size="15" /> Roli
          </label>
          <select v-model="form.role" class="form-select" required>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          :disabled="saving">
          <Save size="16" /> {{ saving ? 'Saqlanmoqda...' : 'Saqlash' }}
        </button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Users, UserPlus, User, Mail, Lock, Shield, Save } from 'lucide-vue-next'
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
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}

onMounted(loadAdmins)

const closeModal = () => {
  showCreateModal.value = false
  form.value = { fullName: '', email: '', password: '', role: 'admin' }
}

const handleCreate = async () => {
  saving.value = true
  try {
    const res = await apiClient.post('/admins', form.value)
    admins.value.unshift(res.data.data)
    closeModal()
  } catch (err) {
    console.error(err)
    alert('Admin yaratishda xatolik yuz berdi')
  } finally { saving.value = false }
}

const toggleAdmin = async (admin) => {
  try {
    await apiClient.patch(`/admins/${admin._id}/toggle`)
    admins.value = admins.value.map(a => a._id === admin._id ? { ...a, isActive: !a.isActive } : a)
  } catch (err) { alert("Xatolik yuz berdi") }
}

const deleteAdmin = async (id) => {
  if (!confirm("O'chirmoqchimisiz?")) return
  try {
    await apiClient.delete(`/admins/${id}`)
    admins.value = admins.value.filter(a => a._id !== id)
  } catch (err) { alert("O'chirishda xatolik") }
}
</script>
