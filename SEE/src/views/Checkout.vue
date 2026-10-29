<template>
  <div class="min-h-screen bg-bg-gray dark:bg-gray-900 py-8">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-text-dark dark:text-white mb-8">
        💳 Checkout
      </h1>
      
      <!-- Cart ni empty -->
      <div v-if="cartStore.count === 0" 
           class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-2">
          Igare ryawe ririmo ubusa
        </h2>
        <p class="text-text-gray mb-6">
          Shyiramo projects mbere yo kwishyura
        </p>
        <router-link to="/browse" 
                     class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          ← Reba Projects
        </router-link>
      </div>
      
      <!-- Cart ifite ibintu -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Items -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Items List -->
          <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700">
            <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-4">
              Ibintu biri mu gare ({{ cartStore.count }})
            </h2>
            
            <div class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id" 
                   class="flex items-center gap-4 py-4 border-b border-border dark:border-gray-700 last:border-0">
                <img :src="getImageUrl(item.image_url)" 
                     :alt="item.title"
                     class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-text-dark dark:text-white truncate">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-text-gray">{{ item.category }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-lg text-primary">${{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Payment Method -->
          <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700">
            <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-4">
              Uburyo bwo kwishyura
            </h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-bg-gray dark:hover:bg-gray-700 transition">
                <input type="radio" v-model="paymentMethod" value="mock_payment" 
                       class="w-4 h-4 text-primary">
                <span class="text-text-dark dark:text-white">🧪 Mock Payment (Kugerageza)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-bg-gray dark:hover:bg-gray-700 transition">
                <input type="radio" v-model="paymentMethod" value="mtn_momo" 
                       class="w-4 h-4 text-primary">
                <span class="text-text-dark dark:text-white">📱 MTN Mobile Money</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-bg-gray dark:hover:bg-gray-700 transition">
                <input type="radio" v-model="paymentMethod" value="bank_transfer" 
                       class="w-4 h-4 text-primary">
                <span class="text-text-dark dark:text-white">🏦 Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Summary -->
        <div class="lg:col-span-1">
          <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700 sticky top-24">
            <h2 class="text-lg font-bold text-text-dark dark:text-white mb-4">
              Incamake y'igura
            </h2>
            
            <div class="space-y-2 mb-4 pb-4 border-b border-border dark:border-gray-700">
              <div class="flex justify-between text-text-gray">
                <span>Ibintu ({{ cartStore.count }})</span>
                <span>${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-text-gray">
                <span>Serivisi</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center mb-6">
              <span class="text-lg font-bold text-text-dark dark:text-white">Igiteranyo</span>
              <span class="text-2xl font-bold text-primary">${{ cartStore.total.toFixed(2) }}</span>
            </div>
            
            <button @click="handleCheckout" 
                    :disabled="loading"
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span v-else>💳 Ishyura ${{ cartStore.total.toFixed(2) }}</span>
            </button>
            
            <router-link to="/cart" 
                         class="block w-full mt-3 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-dark dark:text-white font-bold py-3 px-6 rounded-lg transition">
              ← Subira mu gare
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'
import { getImageUrl } from '@/utils/image'

const router = useRouter()
const cartStore = useCartStore()

const paymentMethod = ref('mock_payment')
const loading = ref(false)

const handleCheckout = async () => {
  loading.value = true
  
  try {
    const response = await api.post('/orders/checkout', {
      items: cartStore.items,
      payment_method: paymentMethod.value
    })
    
    alert(`Igurisha ryagenze neza! Order #${response.data.order_id} 🎉`)
    cartStore.clearCart()
    
    // Redirect to buyer dashboard
    setTimeout(() => {
      router.push('/buyer-dashboard')
    }, 1500)
    
  } catch (error) {
    alert(error.response?.data?.message || 'Kwishyura byanze. Gerageza nanone.')
  } finally {
    loading.value = false
  }
}
</script>