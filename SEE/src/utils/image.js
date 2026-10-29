export function getImageUrl(path) {
  if (!path) return '/placeholder.png'
  
  // Niba ari full URL, garuka
  if (path.startsWith('http')) return path
  
  // Ongeraho backend URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  return `${baseUrl}${path}`
}