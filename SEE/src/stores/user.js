import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from './cart' // ⚠️ ONGERAHO IYI

export const useUserStore = defineStore('user', () => {
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')
  
  const user = ref(savedUser ? JSON.parse(savedUser) : null)
  const token = ref(savedToken || null)
  
  const isLoggedIn = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || null)
  const isSeller = computed(() => user.value?.role === 'student')
  const isBuyer = computed(() => user.value?.role === 'buyer')
  
  function setUser(userData, userToken) {
    user.value = userData
    token.value = userToken
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
    
    // ⚠️ IYI NI YO TWONGEREYE: Gusiba cart iyo umukoresha mushya yinjiye
    const cartStore = useCartStore()
    cartStore.clearCart()
  }
  
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // ⚠️ IYI NI YO TWONGEREYE: Gusiba cart iyo umukoresha asohotse
    const cartStore = useCartStore()
    cartStore.clearCart()
  }
  
  function updateUser(userData) {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  return { 
    user, 
    token, 
    isLoggedIn, 
    userRole,
    isSeller,
    isBuyer,
    setUser, 
    logout,
    updateUser
  }
})