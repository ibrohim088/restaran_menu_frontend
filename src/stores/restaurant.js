import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/client'

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchRestaurants = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get('/restaran')
      restaurants.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Xatolik yuz berdi'
    } finally {
      loading.value = false
    }
  }

  const createRestaurant = async (formData) => {
    const res = await apiClient.post('/restaran', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    restaurants.value.unshift(res.data.data)
    return res.data
  }

  const updateRestaurant = async (id, formData) => {
    const res = await apiClient.put(`/restaran/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const idx = restaurants.value.findIndex(r => r._id === id)
    if (idx !== -1) restaurants.value[idx] = res.data.data
    return res.data
  }

  const deleteRestaurant = async (id) => {
    await apiClient.delete(`/restaran/${id}`)
    restaurants.value = restaurants.value.filter(r => r._id !== id)
  }

  return {
    restaurants,
    loading,
    error,
    fetchRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
  }
})
