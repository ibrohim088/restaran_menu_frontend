import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api', // Vite proxy orqali backendga yo'naltiriladi
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token && !config.url?.startsWith('/public')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor (refresh token logikasi keyinroq qo'shiladi)
apiClient.interceptors.response.use(
  response => response,
  async error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default apiClient