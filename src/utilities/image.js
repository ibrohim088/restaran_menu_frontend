const BACKEND_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function normalizeMediaUrl(value) {
  if (!value) return ''
  const url = value.toString().trim()
  if (!url) return ''

  if (/^(https?:\/\/|data:|blob:)/i.test(url)) {
    return url
  }

  const normalizedPath = url.startsWith('/') ? url : `/${url}`
  return `${BACKEND_URL.replace(/\/+$/, '')}${normalizedPath}`
}
