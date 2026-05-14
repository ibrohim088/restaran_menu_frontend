import apiClient from '@/api/client'

export const getCategoriesByRestaurant = (restaurantId) =>
  apiClient.get(`/categories/restaurants/${restaurantId}`)

export const getCategoryById = (id) =>
  apiClient.get(`/categories/${id}`)

export const createCategory = (restaurantId, formData) =>
  apiClient.post(`/categories/restaurants/${restaurantId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const updateCategory = (id, formData) =>
  apiClient.put(`/categories/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteCategory = (id) =>
  apiClient.delete(`/categories/${id}`)
