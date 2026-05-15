import apiClient from '@/api/client'

export const getMenuItemsByCategory = (categoryId) =>
  apiClient.get(`/menu/categories/${categoryId}`)

export const getMenuItemById = (id) =>
  apiClient.get(`/menu/${id}`)

// TUZATILDI: POST /menu/categories/:categoryId — categoryId URL da bo'lishi kerak
export const createMenuItem = (categoryId, formData) =>
  apiClient.post(`/menu/categories/${categoryId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const updateMenuItem = (id, formData) =>
  apiClient.put(`/menu/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteMenuItem = (id) =>
  apiClient.delete(`/menu/${id}`)
