<template>
 <nav class="sticky top-0 z-50 bg-surface border-b border-border transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold text-primary">
        PROJECT HUBS MARKETPLACE
      </router-link>

      <div class="hidden md:flex items-center gap-8">
        <router-link to="/" class="text-text-gray hover:text-primary transition">Home</router-link>
        <router-link to="/browse" class="text-text-gray hover:text-primary transition">Browse</router-link>
        <router-link to="/sell" class="text-text-gray hover:text-primary transition">Sell</router-link>
                <router-link to="/about" class="text-text-gray hover:text-primary transition">About</router-link>
        <router-link to="/contact" class="text-text-gray hover:text-primary transition">Contact</router-link>
      </div>

      <div class="flex items-center gap-4">
         <!-- LANGUE BUTTON -->
        <button @click="langStore.toggleLanguage" class="text-sm font-medium text-text-gray hover:text-primary transition flex items-center gap-1">
          🌐 {{ langStore.currentLang.toUpperCase() }}
        </button>

        <!-- THEME BUTTON -->
        <button @click="themeStore.toggleTheme" class="p-2 text-text-gray hover:text-primary transition rounded-full hover:bg-bg-gray dark:hover:bg-gray-800">
          <span v-if="themeStore.isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <router-link to="/cart" class="relative p-2 hover:bg-bg-gray rounded-full">
          🛒
       
          <span v-if="cartStore.count > 0"
                class="absolute -top-1 -right-1 bg-danger text-white 
                       text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {{ cartStore.count }}
          </span>
        </router-link>

                <!-- Niba umukoresha yinjiye (Logged In) -->
        <template v-if="userStore.isLoggedIn">
          <div class="relative group">
            <!-- Avatar yawe (Iyo uyishyizeho amaso, menu iraza) -->
            <button class="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-primary">
              {{ userStore.user?.name?.[0] || 'U' }}
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-surface dark:bg-gray-800 rounded-lg shadow-lg border border-border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              
              <!-- Izina ry'umukoresha -->
              <div class="px-4 py-3 border-b border-border dark:border-gray-700">
                <p class="text-sm font-semibold text-text-dark dark:text-white truncate">{{ userStore.user?.name }}</p>
                <p class="text-xs text-text-gray truncate">{{ userStore.user?.email }}</p>
              </div>

              <!-- Links ziri muri Menu -->
              <router-link to="/dashboard" class="block px-4 py-2 text-sm text-text-gray dark:text-gray-300 hover:bg-bg-gray dark:hover:bg-gray-700 hover:text-primary transition-colors">
                📊 Dashboard
              </router-link>
              
              <router-link to="/settings" class="block px-4 py-2 text-sm text-text-gray dark:text-gray-300 hover:bg-bg-gray dark:hover:bg-gray-700 hover:text-primary transition-colors">
                ⚙️ Settings
              </router-link>

              <!-- Buto ya Logout -->
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors border-t border-border dark:border-gray-700">
                🚪 Sohoka (Logout)
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-ghost">Login</router-link>
          <router-link to="/signup" class="btn-primary text-sm">Sign Up</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { useLanguageStore } from '../stores/language'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const langStore = useLanguageStore()
const router = useRouter()

// Iyi function isohoka
function handleLogout() {
  userStore.logout()   // Siba amakuru y'umukoresha muri Pinia na localStorage
  router.push('/')     // <-- HINDURA IYI: Mujyane kuri Home (Ahabanza) aho kujya kuri Login
}
</script>