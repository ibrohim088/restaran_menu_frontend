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

    <!-- Search -->
    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text">
          <Search size="16" />
        </span>
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Ism yoki email bo'yicha qidirish..."
          @input="onSearch" />
        <button v-if="searchQuery" class="btn btn-outline-secondary" @click="clearSearch">
          <X size="16" />
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <AdminTable :admins="admins" @toggle="toggleAdmin" @remove="deleteAdmin" />

    <!-- Pagination -->
    <div v-if="pagination.pages > 1" class="d-flex justify-content-between align-items-center mt-4">
      <small class="text-muted">
        Jami: {{ pagination.total }} ta admin
      </small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" :class="{ disabled: pagination.page === 1 }">
            <button class="page-link" @click="goToPage(pagination.page - 1)">
              <ChevronLeft size="14" />
            </button>
          </li>
          <li v-for="p in pagination.pages" :key="p" class="page-item" :class="{ active: p === pagination.page }">
            <button class="page-link" @click="goToPage(p)">{{ p }}</button>
          </li>
          <li class="page-item" :class="{ disabled: pagination.page === pagination.pages }">
            <button class="page-link" @click="goToPage(pagination.page + 1)">
              <ChevronRight size="14" />
            </button>
          </li>
        </ul>
      </nav>
    </div>

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
import { Users, UserPlus, User, Mail, Lock, Shield, Save, Search, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import apiClient from '@/api/client'
import AdminTable from '@/components/admin/users/AdminTable.vue'
import BaseModal from '@/components/common/BaseModal.vue'

const admins = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const searchQuery = ref('')
const form = ref({ fullName: '', email: '', password: '', role: 'admin' })

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
})

let searchTimeout = null

const loadAdmins = async (page = 1, search = '') => {
  loading.value = true
  try {
    const params = { page, limit: pagination.value.limit }
    if (search) params.search = search
    const res = await apiClient.get('/admins', { params })
    admins.value = res.data.data || []
    if (res.data.pagination) {
      pagination.value = { ...pagination.value, ...res.data.pagination }
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => loadAdmins())

const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    loadAdmins(1, searchQuery.value)
  }, 400)
}

const clearSearch = () => {
  searchQuery.value = ''
  pagination.value.page = 1
  loadAdmins(1, '')
}

const goToPage = (page) => {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.page = page
  loadAdmins(page, searchQuery.value)
}

const closeModal = () => {
  showCreateModal.value = false
  form.value = { fullName: '', email: '', password: '', role: 'admin' }
}

const handleCreate = async () => {
  saving.value = true
  try {
    await apiClient.post('/admins', form.value)
    closeModal()
    loadAdmins(pagination.value.page, searchQuery.value)
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
    admins.value = admins.value.map(a =>
      a._id === admin._id ? { ...a, isActive: !a.isActive } : a
    )
  } catch (err) {
    alert('Xatolik yuz berdi')
  }
}

const deleteAdmin = async (id) => {
  if (!confirm("O'chirmoqchimisiz?")) return
  try {
    await apiClient.delete(`/admins/${id}`)
    loadAdmins(pagination.value.page, searchQuery.value)
  } catch (err) {
    alert("O'chirishda xatolik")
  }
}
</script>