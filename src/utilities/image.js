function getBackendUrl() {
  // Env da berilgan bo'lsa — ishlatamiz
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL
  if (envUrl) return envUrl

  // Brauzerdan joriy IP ni olamiz (telefon ham, kompyuter ham to'g'ri ishlaydi)
  const hostname = window.location.hostname
  const port = 8000
  return `http://${hostname}:${port}`
}

const BACKEND_URL = getBackendUrl()

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