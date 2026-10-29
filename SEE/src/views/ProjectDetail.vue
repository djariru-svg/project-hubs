<template>
  <div class="min-h-screen bg-bg-gray dark:bg-gray-900 transition-colors">
    <Navbar />
    
    <div class="max-w-6xl mx-auto px-6 py-10">
      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse space-y-6">
        <div class="h-96 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-text-dark dark:text-white mb-2">
          {{ error }}
        </h2>
        <router-link to="/browse" class="btn-primary inline-block mt-4">
          ← Subira kuri Browse
        </router-link>
      </div>
      
      <!-- Project Content -->
      <div v-else-if="project" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Image -->
          <div class="bg-surface dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-border dark:border-gray-700">
            <img 
              :src="getImageUrl(project.image_url)" 
              :alt="project.title"
              class="w-full h-96 object-cover"
            />
          </div>
          
          <!-- Title & Meta -->
          <div class="bg-surface dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-border dark:border-gray-700">
            <div class="flex items-start justify-between gap-4 mb-4">
              <h1 class="text-3xl font-bold text-text-dark dark:text-white">
                {{ project.title }}
              </h1>
              <span 
                v-if="project.is_sold"
                class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm font-semibold rounded-full whitespace-nowrap"
              >
                Sold Out
              </span>
            </div>
            
            <!-- Seller Info -->
            <div class="flex items-center gap-3 pb-4 border-b border-border dark:border-gray-700">
              <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {{ project.seller_name?.[0] || 'U' }}
              </div>
              <div>
                <p class="font-semibold text-text-dark dark:text-white">
                  {{ project.seller_name }}
                </p>
                <p class="text-sm text-text-gray">
                  {{ project.seller_university }}
                </p>
              </div>
            </div>
            
            <!-- Description -->
            <div class="pt-4">
              <h2 class="text-lg font-bold text-text-dark dark:text-white mb-2">
                Ibisobanuro (Description)
              </h2>
              <p class="text-text-gray dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {{ project.description }}
              </p>
            </div>
          </div>
          
          <!-- Tech Stack -->
          <div v-if="project.tech_stack" class="bg-surface dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-border dark:border-gray-700">
            <h2 class="text-lg font-bold text-text-dark dark:text-white mb-3">
              🛠️ Ikoranabuhanga (Tech Stack)
            </h2>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in techStackArray" 
                :key="tech"
                class="px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-sm font-medium rounded-full"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Demo URL -->
          <div v-if="project.demo_url" class="bg-surface dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-border dark:border-gray-700">
            <h2 class="text-lg font-bold text-text-dark dark:text-white mb-3">
              🎥 Demo
            </h2>
            <a 
              :href="project.demo_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition"
            >
              {{ project.demo_url }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Right Column (Price + Actions) -->
        <div class="lg:col-span-1">
          <div class="bg-surface dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-border dark:border-gray-700 sticky top-24">
            <!-- Price -->
            <div class="mb-6">
              <p class="text-sm text-text-gray mb-1">Igiciro</p>
              <p class="text-4xl font-bold text-primary">
                {{ project.price == 0 ? 'Free' : `$${project.price}` }}
              </p>
            </div>
            
            <!-- Category Badge -->
            <div class="mb-6">
              <span class="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
                {{ categoryLabel }}
              </span>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3">
              <!-- Add to Cart -->
              <button 
                v-if="!project.is_sold && !isOwner"
                @click="handleAddToCart"
                :disabled="isInCart"
                class="btn-primary w-full flex justify-center items-center gap-2"
                :class="{ 'opacity-60 cursor-not-allowed': isInCart }"
              >
                <span v-if="isInCart">✓ Already in Cart</span>
                <span v-else>🛒 Add to Cart</span>
              </button>
              
              <!-- Buy Now -->
              <button 
                v-if="!project.is_sold && !isOwner"
                @click="handleBuyNow"
                class="btn-secondary w-full"
              >
                ⚡ Buy Now
              </button>
              
              <!-- Sold Out -->
              <div 
                v-if="project.is_sold"
                class="w-full py-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-center font-bold rounded-lg"
              >
                ❌ This project has been sold
              </div>
              
              <!-- Owner View -->
              <div 
                v-if="isOwner"
                class="w-full py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-center font-semibold rounded-lg"
              >
                ℹ️ This is your own project
              </div>
              
              <!-- View Cart -->
              <router-link 
                v-if="isInCart"
                to="/cart"
                class="block w-full py-3 text-center bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
              >
                View Cart ({{ cartStore.count }}) →
              </router-link>
            </div>
            
            <!-- Created Date -->
            <div class="mt-6 pt-6 border-t border-border dark:border-gray-700 text-sm text-text-gray">
              <p>📅 Published: {{ formatDate(project.created_at) }}</p>
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
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const project = ref(null)
const loading = ref(true)
const error = ref('')
const hasPurchased = ref(false)

// Helper: Get image URL
function getImageUrl(path) {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http')) return path
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  return `${baseUrl}${path}`
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const categoryLabel = computed(() => {
  const categories = {
    web: '🌐 Web Development',
    mobile: '📱 Mobile App',
    ai: '🤖 AI / Machine Learning',
    iot: '🔌 Embedded / IoT'
  }
  return categories[project.value?.category] || project.value?.category
})

const techStackArray = computed(() => {
  if (!project.value?.tech_stack) return []
  return project.value.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
})

const isOwner = computed(() => {
  return userStore.user?.id === project.value?.seller_id
})

const isInCart = computed(() => {
  return cartStore.items.some(item => item.id === project.value?.id)
})

function handleAddToCart() {
  if (!userStore.isLoggedIn) {
    router.push({ name: 'Login', query: { redirect: route.fullPath } })
    return
  }
  cartStore.addItem(project.value)
}

function handleBuyNow() {
  if (!userStore.isLoggedIn) {
    router.push({ name: 'Login', query: { redirect: route.fullPath } })
    return
  }
  cartStore.addItem(project.value)
  router.push('/checkout')
}

onMounted(async () => {
  try {
    const response = await api.get(`/projects/${route.params.id}`)
    project.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Project not found'
  } finally {
    loading.value = false
  }
})
</script>