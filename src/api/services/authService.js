import apiClient from '@/api/client'

export const login = (email, password) =>
  apiClient.post('/auth/login', { email, password })

export const logout = () =>
  apiClient.post('/auth/logout')

export const getMe = () =>
  apiClient.get('/auth/me')

export const refreshToken = (token) =>
  apiClient.post('/auth/refresh', { refreshToken: token })

export const changePassword = (oldPassword, newPassword) =>
  apiClient.put('/auth/change-password', { oldPassword, newPassword })
