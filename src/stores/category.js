import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/client'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async (restaurantId) => {
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get(`/categories/restaurants/${restaurantId}`)
      categories.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Xatolik yuz berdi'
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (restaurantId, formData) => {
    const res = await apiClient.post(`/categories/restaurants/${restaurantId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    categories.value.unshift(res.data.data)
    return res.data
  }

  const updateCategory = async (id, formData) => {
    const res = await apiClient.put(`/categories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const idx = categories.value.findIndex(c => c._id === id)
    if (idx !== -1) categories.value[idx] = res.data.data
    return res.data
  }

  const deleteCategory = async (id) => {
    await apiClient.delete(`/categories/${id}`)
    categories.value = categories.value.filter(c => c._id !== id)
  }

  return { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory }
})
