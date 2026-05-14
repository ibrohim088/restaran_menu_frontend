// src/stores/public.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/client.js'


export const getPublicMenu = (restaurantId) =>
  apiClient.get(`/public/menu/${restaurantId}`)

export const getPublicCategories = (restaurantId) =>
  apiClient.get(`/public/menu/${restaurantId}/categories`)

export const usePublicStore = defineStore('public', () => {
  const allRestaurants = ref([])
  const currentRestaurant = ref(null)
  const menu = ref([])
  const popularItems = ref([])

  const loading = ref(false)
  const error = ref(null)

  // Barcha restoranlarni olish (PublicHome uchun)
  const fetchAllRestaurants = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get('/public/restaurants')
      allRestaurants.value = res.data.data || []
    } catch (err) {
      error.value = 'Restoranlarni yuklashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Bitta restoranning to‘liq menyusini olish
  const fetchRestaurantMenu = async (restaurantId) => {
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get(`/public/menu/${restaurantId}`)
      currentRestaurant.value = res.data.data.restaurant
      menu.value = res.data.data.menu || []
      popularItems.value = res.data.data.popularItems || []
    } catch (err) {
      error.value = err.response?.data?.message || 'Menyuni yuklashda xatolik'
    } finally {
      loading.value = false
    }
  }

  return {
    allRestaurants,
    currentRestaurant,
    menu,
    popularItems,
    loading,
    error,
    fetchAllRestaurants,
    fetchRestaurantMenu
  }
})