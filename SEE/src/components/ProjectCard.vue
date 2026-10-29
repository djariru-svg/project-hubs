<template>
  <div class="group bg-surface dark:bg-gray-800 rounded-card shadow-soft hover:shadow-card transition-all duration-200 overflow-hidden border border-transparent dark:border-gray-700 flex flex-col">
    <!-- IFOTO -->
    <router-link :to="`/project/${project.id}`" class="block">
      <div class="aspect-video bg-bg-gray dark:bg-gray-700 relative overflow-hidden">
        <img 
          v-if="project.image_url" 
          :src="getImageUrl(project.image_url)" 
          :alt="project.title" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-purple-600">
          <span class="text-white text-4xl">📦</span>
        </div>
        
        <!-- Sold badge -->
        <div 
          v-if="project.is_sold"
          class="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded"
        >
          SOLD
        </div>
      </div>
    </router-link>
    
    <!-- INFO -->
    <div class="p-4 flex-1 flex flex-col">
      <router-link :to="`/project/${project.id}`" class="block">
        <h3 class="font-semibold text-text-dark dark:text-white group-hover:text-primary transition truncate">
          {{ project.title }}
        </h3>
        <p class="text-sm text-text-gray dark:text-gray-400 mt-1">
          by {{ project.seller || project.seller_name || 'Unknown' }}
        </p>
      </router-link>
      
      <!-- Category -->
      <div class="flex flex-wrap gap-1 mt-2">
        <span class="text-xs px-2 py-0.5 bg-primary-light dark:bg-primary/20 text-primary dark:text-primary-light rounded">
          {{ categoryLabel }}
        </span>
      </div>
      
      <!-- Spacer -->
      <div class="flex-1"></div>
      
      <!-- Price + Actions -->
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-border dark:border-gray-700">
        <span 
          class="badge font-bold" 
          :class="project.price == 0 ? 'bg-secondary/10 text-secondary' : 'bg-primary-light text-primary dark:bg-primary/20 dark:text-primary-light'"
        >
          {{ project.price == 0 ? 'Free' : `$${project.price}` }}
        </span>
        
        <!-- Add to Cart Button -->
        <button 
          v-if="!project.is_sold && !isOwner"
          @click.prevent="handleAddToCart"
          :disabled="isInCart"
          class="text-sm px-3 py-1.5 rounded-lg font-semibold transition"
          :class="isInCart 
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary-dark text-white'"
        >
          {{ isInCart ? '✓ In Cart' : '+ Cart' }}
        </button>
        
        <span 
          v-else-if="project.is_sold"
          class="text-xs text-red-500 font-semibold"
        >
          Sold Out
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { getImageUrl } from '@/utils/image'

const props = defineProps({
  project: { type: Object, required: true }
})

const cartStore = useCartStore()
const userStore = useUserStore()

// Category label
const categoryLabel = computed(() => {
  const categories = {
    web: '🌐 Web',
    mobile: '📱 Mobile',
    ai: '🤖 AI/ML',
    iot: '🔌 IoT'
  }
  return categories[props.project.category] || props.project.category
})

// Is current user the owner?
const isOwner = computed(() => {
  return userStore.user?.id === props.project.seller_id
})

// Is project already in cart?
const isInCart = computed(() => {
  return cartStore.items.some(item => item.id === props.project.id)
})

// Add to cart
function handleAddToCart() {
  if (!userStore.isLoggedIn) {
    alert('Nyamuneka injira mbere yo kongera mu gare')
    return
  }
  cartStore.addItem(props.project)
}
</script>