import apiClient from '@/api/client'

export const getPublicMenu = (restaurantId) =>
  apiClient.get(`/public/menu/${restaurantId}`)

export const getPublicCategories = (restaurantId) =>
  apiClient.get(`/public/menu/${restaurantId}/categories`)
