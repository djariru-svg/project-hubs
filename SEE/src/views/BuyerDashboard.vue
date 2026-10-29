<template>
  <div class="min-h-screen bg-bg-gray dark:bg-gray-900 py-8">
    <Navbar />
    
    <div class="max-w-6xl mx-auto px-4">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 class="text-3xl font-bold mb-2">🛒 Ibyo Naguze</h1>
        <p class="text-white/80">Reba projects zose waguze kuri Project Hubs</p>
      </div>
      
      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-text-gray">Gutegura ibyo waguze...</p>
      </div>
      
      <!-- No Orders -->
      <div v-else-if="orders.length === 0" 
           class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
        <div class="text-6xl mb-4">📦</div>
        <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-2">
          Nta byo uragura
        </h2>
        <p class="text-text-gray mb-6">
          Tangira ugure projects z'abandi banyeshuri
        </p>
        <router-link to="/browse" 
                     class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          Reba Projects →
        </router-link>
      </div>
      
      <!-- Orders List -->
      <div v-else class="space-y-6">
        <!-- Summary Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-surface dark:bg-gray-800 rounded-xl p-4 border border-border dark:border-gray-700">
            <p class="text-sm text-text-gray">Igurisha ryose</p>
            <p class="text-2xl font-bold text-text-dark dark:text-white">{{ orders.length }}</p>
          </div>
          <div class="bg-surface dark:bg-gray-800 rounded-xl p-4 border border-border dark:border-gray-700">
            <p class="text-sm text-text-gray">Projects zaguzwe</p>
            <p class="text-2xl font-bold text-text-dark dark:text-white">{{ totalItems }}</p>
          </div>
          <div class="bg-surface dark:bg-gray-800 rounded-xl p-4 border border-border dark:border-gray-700">
            <p class="text-sm text-text-gray">Amafaranga yose</p>
            <p class="text-2xl font-bold text-primary">${{ totalSpent.toFixed(2) }}</p>
          </div>
        </div>
        
        <!-- Orders -->
        <div v-for="order in orders" :key="order.order_id" 
             class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-border dark:border-gray-700">
          
          <!-- Order Header -->
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-border dark:border-gray-700">
            <div>
              <p class="text-sm text-text-gray">Order #{{ order.order_id }}</p>
              <p class="text-sm text-text-gray">
                {{ formatDate(order.created_at) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary">${{ order.total_amount }}</p>
              <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300': order.status === 'completed',
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300': order.status === 'pending',
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300': order.status === 'cancelled'
                    }">
                {{ order.status }}
              </span>
            </div>
          </div>
          
          <!-- Order Items -->
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.project_id" 
                 class="flex gap-4 p-4 bg-bg-gray dark:bg-gray-700 rounded-lg">
              <img :src="getImageUrl(item.image_url)" 
                   :alt="item.title"
                   class="w-24 h-24 object-cover rounded-lg flex-shrink-0">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-lg text-text-dark dark:text-white">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-text-gray mb-2 line-clamp-2">
                  {{ item.description }}
                </p>
                <p class="text-xs text-text-gray">
                  Byagurishijwe na: <span class="font-semibold text-text-dark dark:text-white">{{ item.seller_name }}</span>
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <a v-if="item.demo_url" 
                     :href="item.demo_url" 
                     target="_blank"
                     rel="noopener noreferrer"
                     class="text-sm bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1">
                    🎥 Reba Demo
                  </a>
                  <router-link :to="`/project/${item.project_id}`"
                               class="text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-text-dark dark:text-white px-3 py-1.5 rounded-lg transition">
                    📄 Reba Byose
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'
import { getImageUrl } from '@/utils/image'

const router = useRouter()
const userStore = useUserStore()

const orders = ref([])
const loading = ref(true)

// Computed stats
const totalItems = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.items.length, 0)
})

const totalSpent = computed(() => {
  return orders.value.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
})

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  
  try {
    const response = await api.get('/orders/my-orders')
    orders.value = response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})
</script>