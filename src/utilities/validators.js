export const required = (value) => {
  return value != null && value !== '' ? true : 'Bu maydon majburiy'
}

export const minLength = (min) => (value) => {
  return value && value.length >= min ? true : `Kamida ${min} ta belgi bo'lishi kerak`
}

export const maxLength = (max) => (value) => {
  return value && value.length <= max ? true : `Ko'pi bilan ${max} ta belgi bo'lishi mumkin`
}

export const email = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) ? true : 'Noto\'g\'ri email format'
}

export const numeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value)) ? true : 'Faqat raqamlar'
}

export const positiveNumber = (value) => {
  return numeric(value) && parseFloat(value) > 0 ? true : 'Musbat raqam bo\'lishi kerak'
}

export const url = (value) => {
  const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/
  return urlRegex.test(value) ? true : 'Noto\'g\'ri URL format'
}