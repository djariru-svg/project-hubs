import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const savedCart = localStorage.getItem('cart')
  const items = ref(savedCart ? JSON.parse(savedCart) : [])
  
  const count = computed(() => items.value.length)
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + parseFloat(item.price || 0), 0)
  )
  
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })
  
  function addItem(project) {
    if (!items.value.find(i => i.id === project.id)) {
      items.value.push(project)
      return true
    }
    return false
  }
  
  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }
  
  function clearCart() {
    items.value = []
    localStorage.removeItem('cart') // ⚠️ IYI NI YO TWONGEREYE (Gusiba burundu)
  }
  
  function isInCart(id) {
    return items.value.some(i => i.id === id)
  }
  
  return { 
    items, 
    count, 
    total, 
    addItem, 
    removeItem, 
    clearCart,
    isInCart
  }
})