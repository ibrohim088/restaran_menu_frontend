import apiClient from '@/api/client'

export const getRestaurants = () =>
  apiClient.get('/restaran')

export const getRestaurantById = (id) =>
  apiClient.get(`/restaran/${id}`)

export const createRestaurant = (formData) =>
  apiClient.post('/restaran', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateRestaurant = (id, formData) =>
  apiClient.put(`/restaran/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteRestaurant = (id) =>
  apiClient.delete(`/restaran/${id}`)

export const generateQR = (id) =>
  apiClient.post(`/restaran/${id}/qr`)
