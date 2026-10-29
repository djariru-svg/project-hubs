<template>
  <div class="min-h-screen bg-bg-gray dark:bg-gray-900 py-8">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-text-dark dark:text-white mb-8">
        🛒 Igare Ryawe
      </h1>
      
      <!-- Cart is Empty -->
      <div v-if="cartStore.count === 0" 
           class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-2">
          Igare ryawe ririmo ubusa
        </h2>
        <p class="text-text-gray mb-6">
          Shyiramo projects mbere yo kugura!
        </p>
        <router-link to="/browse" 
                     class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          Reba Projects
        </router-link>
      </div>
      
      <!-- Cart has Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Items List -->
        <div class="lg:col-span-2">
          <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-text-dark dark:text-white">
                Ibintu ({{ cartStore.count }})
              </h2>
              <button @click="handleClearCart"
                      class="text-sm text-danger hover:text-red-700 font-semibold transition">
                Siba Byose
              </button>
            </div>
            
            <div class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id"
                   class="flex gap-4 p-4 bg-bg-gray dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                
                <img :src="getImageUrl(item.image_url)" 
                     :alt="item.title"
                     class="w-24 h-24 object-cover rounded-lg flex-shrink-0">
                
                <div class="flex-1 min-w-0">
                  <router-link :to="`/project/${item.id}`"
                               class="font-semibold text-lg text-text-dark dark:text-white hover:text-primary transition line-clamp-1">
                    {{ item.title }}
                  </router-link>
                  <p class="text-sm text-text-gray mt-1 line-clamp-2">
                    {{ item.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="inline-block px-2 py-1 text-xs bg-primary-light dark:bg-primary/20 text-primary rounded">
                      {{ item.category }}
                    </span>
                  </div>
                </div>
                
                <div class="flex flex-col items-end justify-between flex-shrink-0">
                  <p class="text-xl font-bold text-primary">${{ item.price }}</p>
                  <button @click="handleRemove(item.id)"
                          class="text-sm text-danger hover:text-red-700 font-semibold transition">
                    ❌ Siba
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700 sticky top-24">
            <h2 class="text-lg font-bold text-text-dark dark:text-white mb-4">
              Incamake
            </h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-text-gray">
                <span>Ibice ({{ cartStore.count }})</span>
                <span>${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-text-gray">
                <span>Serivisi</span>
                <span>$0.00</span>
              </div>
              <div class="border-t border-border dark:border-gray-700 pt-3 flex justify-between items-center">
                <span class="text-lg font-bold text-text-dark dark:text-white">Igiteranyo</span>
                <span class="text-2xl font-bold text-primary">${{ cartStore.total.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="space-y-3">
              <router-link to="/browse"
                           class="block text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-dark dark:text-white font-bold py-3 px-6 rounded-lg transition">
                ← Komeza ugure
              </router-link>
              <router-link to="/checkout"
                           class="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
                💳 Ishyura →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { getImageUrl } from '@/utils/image'

const cartStore = useCartStore()

const handleRemove = (id) => {
  cartStore.removeItem(id)
}

const handleClearCart = () => {
  if (confirm('Urashaka gusa ibintu byose mu gare?')) {
    cartStore.clearCart()
  }
}
</script>