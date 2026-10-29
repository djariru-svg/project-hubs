<template>
  <nav class="sticky top-0 z-50 bg-surface border-b border-border transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-primary">
        PROJECT HUBS
      </router-link>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/browse" class="nav-link">Browse</router-link>
        <!-- ✅ Sell link igaragara GUSA kuri sellers -->
        <router-link 
          v-if="userStore.isSeller"
          to="/sell" 
          class="nav-link"
        >
          Sell
        </router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
      
      <!-- Right Side -->
      <div class="flex items-center gap-3">
        <!-- Language -->
        <button 
          @click="langStore.toggleLanguage" 
          class="text-sm font-medium text-text-gray hover:text-primary transition"
        >
          🌐 {{ langStore.currentLang.toUpperCase() }}
        </button>
        
        <!-- Theme -->
        <button 
          @click="themeStore.toggleTheme" 
          class="p-2 text-text-gray hover:text-primary transition rounded-full"
        >
          <span v-if="themeStore.isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
        
        <!-- Cart -->
        <router-link to="/cart" class="relative p-2">
          🛒
          <span 
            v-if="cartStore.count > 0"
            class="absolute -top-1 -right-1 bg-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cartStore.count }}
          </span>
        </router-link>
        
        <!-- Logged In User -->
        <template v-if="userStore.isLoggedIn">
          <div class="relative group">
            <button class="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
              {{ userStore.user?.name?.[0] || 'U' }}
            </button>
            
            <!-- Dropdown -->
            <div class="absolute right-0 mt-2 w-56 bg-surface dark:bg-gray-800 rounded-lg shadow-lg border border-border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="px-4 py-3 border-b border-border dark:border-gray-700">
                <p class="text-sm font-semibold text-text-dark dark:text-white truncate">
                  {{ userStore.user?.name }}
                </p>
                <p class="text-xs text-text-gray truncate">
                  {{ userStore.user?.email }}
                </p>
                <span class="inline-block mt-1 text-xs px-2 py-0.5 bg-primary-light dark:bg-primary/20 text-primary rounded-full capitalize">
                  {{ userStore.user?.role }}
                </span>
              </div>
              
              <!-- ✅ Dashboard link ihinduka bitewe na role -->
              <router-link 
                :to="userStore.isSeller ? '/dashboard' : '/buyer-dashboard'"
                class="block px-4 py-2 text-sm text-text-gray hover:bg-bg-gray hover:text-primary transition-colors"
              >
                📊 {{ userStore.isSeller ? 'Seller Dashboard' : 'My Purchases' }}
              </router-link>
              
              <router-link 
                v-if="userStore.isSeller"
                to="/sell" 
                class="block px-4 py-2 text-sm text-text-gray hover:bg-bg-gray hover:text-primary transition-colors"
              >
                ➕ Sell Project
              </router-link>

              <router-link to="/settings" class="block px-4 py-2 text-sm text-text-gray dark:text-gray-300 hover:bg-bg-gray dark:hover:bg-gray-700 hover:text-primary transition-colors">
  ⚙️ Igenamiterere (Settings)
</router-link>
              
              <button 
                @click="handleLogout" 
                class="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors border-t border-border dark:border-gray-700"
              >
                🚪 Sohoka (Logout)
              </button>
            </div>
          </div>
        </template>
        
        <!-- Guest User -->
        <template v-else>
          <router-link to="/login" class="btn-ghost hidden sm:inline-block">Login</router-link>
          <router-link to="/signup" class="btn-primary text-sm">Sign Up</router-link>
        </template>
        
        <!-- ✅ Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-text-gray hover:text-primary transition"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- ✅ Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden border-t border-border dark:border-gray-700 bg-surface dark:bg-gray-800"
    >
      <div class="px-6 py-4 space-y-2">
        <router-link to="/" @click="mobileMenuOpen = false" class="block py-2 text-text-gray hover:text-primary">Home</router-link>
        <router-link to="/browse" @click="mobileMenuOpen = false" class="block py-2 text-text-gray hover:text-primary">Browse</router-link>
        <router-link 
          v-if="userStore.isSeller"
          to="/sell" 
          @click="mobileMenuOpen = false" 
          class="block py-2 text-text-gray hover:text-primary"
        >
          Sell
        </router-link>
        <router-link to="/about" @click="mobileMenuOpen = false" class="block py-2 text-text-gray hover:text-primary">About</router-link>
        <router-link to="/contact" @click="mobileMenuOpen = false" class="block py-2 text-text-gray hover:text-primary">Contact</router-link>
      </div>
      
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { useLanguageStore } from '../stores/language'

const cartStore = useCartStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const langStore = useLanguageStore()
const router = useRouter()

const mobileMenuOpen = ref(false)

function handleLogout() {
  userStore.logout()
  cartStore.clearCart()
  mobileMenuOpen.value = false
  router.push('/')
}
</script>