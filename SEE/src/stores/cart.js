import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const count = computed(() => items.value.length)
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0)
  )

  function addItem(project) {
    if (!items.value.find(i => i.id === project.id)) {
      items.value.push(project)
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  return { items, count, total, addItem, removeItem, clearCart }
})