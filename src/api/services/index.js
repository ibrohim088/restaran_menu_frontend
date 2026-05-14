import apiClient from '@/api/client'

export const restaurantService = {
  async getAll() {
    return apiClient.get('/restaran')
  },
  
  async getById(id) {
    return apiClient.get(`/restaran/${id}`)
  },
  
  async create(formData) {
    return apiClient.post('/restaran', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async update(id, formData) {
    return apiClient.put(`/restaran/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async delete(id) {
    return apiClient.delete(`/restaran/${id}`)
  },
  
  async getStats() {
    return apiClient.get('/restaran/stats')
  }
}

export const categoryService = {
  async getAll() {
    return apiClient.get('/categorya')
  },
  
  async getById(id) {
    return apiClient.get(`/categorya/${id}`)
  },
  
  async getByRestaurant(restaurantId) {
    return apiClient.get(`/categorya?restaurantId=${restaurantId}`)
  },
  
  async create(formData) {
    return apiClient.post('/categorya', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async update(id, formData) {
    return apiClient.put(`/categorya/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async delete(id) {
    return apiClient.delete(`/categorya/${id}`)
  }
}

export const menuItemService = {
  async getAll() {
    return apiClient.get('/menu-item')
  },
  
  async getById(id) {
    return apiClient.get(`/menu-item/${id}`)
  },
  
  async getByCategory(categoryId) {
    return apiClient.get(`/menu-item?categoryId=${categoryId}`)
  },
  
  async create(formData) {
    return apiClient.post('/menu-item', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async update(id, formData) {
    return apiClient.put(`/menu-item/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  async delete(id) {
    return apiClient.delete(`/menu-item/${id}`)
  }
}

export const adminService = {
  async getAll() {
    return apiClient.get('/admin')
  },
  
  async getById(id) {
    return apiClient.get(`/admin/${id}`)
  },
  
  async create(formData) {
    return apiClient.post('/admin', formData)
  },
  
  async update(id, formData) {
    return apiClient.put(`/admin/${id}`, formData)
  },
  
  async delete(id) {
    return apiClient.delete(`/admin/${id}`)
  }
}

export const publicService = {
  async getRestaurants() {
    return apiClient.get('/public/restoran')
  },
  
  async getRestaurantById(id) {
    return apiClient.get(`/public/restoran/${id}`)
  },
  
  async getRestaurantMenu(id) {
    return apiClient.get(`/public/restoran/${id}/menu`)
  }
}
