export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const isEmpty = (obj) => {
  return obj == null || Object.keys(obj).length === 0
}

export const cloneDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}