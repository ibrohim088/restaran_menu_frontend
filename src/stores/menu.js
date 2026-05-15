import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/client'

export const useMenuItemStore = defineStore('menuItem', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchMenuItems = async (categoryId) => {
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get(`/menu/categories/${categoryId}`)
      items.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Xatolik yuz berdi'
    } finally {
      loading.value = false
    }
  }

  // TUZATILDI: categoryId alohida parametr sifatida
  const createMenuItem = async (categoryId, formData) => {
    const res = await apiClient.post(`/menu/categories/${categoryId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    items.value.unshift(res.data.data)
    return res.data
  }

  const updateMenuItem = async (id, formData) => {
    const res = await apiClient.put(`/menu/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const idx = items.value.findIndex(i => i._id === id)
    if (idx !== -1) items.value[idx] = res.data.data
    return res.data
  }

  const deleteMenuItem = async (id) => {
    await apiClient.delete(`/menu/${id}`)
    items.value = items.value.filter(i => i._id !== id)
  }

  return { items, loading, error, fetchMenuItems, createMenuItem, updateMenuItem, deleteMenuItem }
})
