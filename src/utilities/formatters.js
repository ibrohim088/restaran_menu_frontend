import { CURRENCY, DATE_FORMAT } from './constants.js'

export const formatPrice = (price) => {
  if (!price) return '0 ' + CURRENCY
  return price.toLocaleString() + ' ' + CURRENCY
}

export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(DATE_FORMAT)
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString(DATE_FORMAT)
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}