<template>
  <div class="bg-bg-gray dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-6 py-10">
      
      <!-- HEADER -->
      <div class="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ langStore.t('welcome') }}, {{ userStore.user?.name }}! 👋</h1>
          <p class="text-white/80 text-lg">Project Hubs Marketplace Dashboard</p>
        </div>
        
        <!-- Role Badge -->
        <div class="bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/30 text-center">
          <span class="block text-xs uppercase tracking-wider text-white/80 mb-1">Uruhare rwawe</span>
          <span class="font-bold text-lg capitalize">
            {{ userStore.user?.role === 'student' ? '🎓 Umunyeshuri (Seller)' : '🛒 Umuguzi (Buyer)' }}
          </span>
        </div>
      </div>

      <!-- STATS CARDS (Imibare Nyayo) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <!-- 1. Projects -->
        <div class="card border border-border dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary-light dark:bg-primary/20 text-primary rounded-full flex items-center justify-center text-2xl">📦</div>
            <div>
              <p class="text-text-gray text-sm font-medium">Projects Zanjye</p>
              <h3 class="text-2xl font-bold text-text-dark dark:text-white">{{ stats.totalProjects }}</h3>
            </div>
          </div>
        </div>

        <!-- 2. Earnings -->
        <div class="card border border-border dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-2xl">💰</div>
            <div>
              <p class="text-text-gray text-sm font-medium">Amafaranga Yinjiye</p>
              <h3 class="text-2xl font-bold text-text-dark dark:text-white">${{ stats.totalEarnings }}</h3>
            </div>
          </div>
        </div>

        <!-- 3. Rating -->
        <div class="card border border-border dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-warning/10 text-warning rounded-full flex items-center justify-center text-2xl">⭐</div>
            <div>
              <p class="text-text-gray text-sm font-medium">Amanota (Rating)</p>
              <h3 class="text-2xl font-bold text-text-dark dark:text-white">{{ stats.rating }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTION CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sell Card -->
        <div class="card border border-border dark:border-gray-700 flex flex-col justify-between hover:border-primary transition-colors">
          <div>
            <h2 class="text-xl font-bold mb-2 dark:text-white">Ufite project ushaka kugurisha?</h2>
            <p class="text-text-gray mb-6">Shyira project yawe kuri Project Hubs kugira ngo abandi bayibone.</p>
          </div>
          <router-link to="/sell" class="btn-primary w-full text-center">
            + Shyira Project Nshya
          </router-link>
        </div>

        <!-- Browse Card -->
        <div class="card border border-border dark:border-gray-700 flex flex-col justify-between hover:border-secondary transition-colors">
          <div>
            <h2 class="text-xl font-bold mb-2 dark:text-white">Ushaka kugura project?</h2>
            <p class="text-text-gray mb-6">Reba projects ziteguye ziri kuri urubuga, ugure iyo ushaka.</p>
          </div>
          <router-link to="/browse" class="btn-secondary w-full text-center">
            Reba Projects Zose
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useLanguageStore } from '../stores/language'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../services/api'

const userStore = useUserStore()
const langStore = useLanguageStore()
const router = useRouter()

// 1. Ibi ni ibice bibika imibare (Stats)
const stats = ref({
  totalProjects: 0,
  totalEarnings: 0,
  rating: 'Nta Manota'
})

// 2. Iyi function isaba backend imibare iyo page ifungutse
onMounted(async () => {
  // Reba niba atinjiye, mujyane kuri login
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  try {
    const response = await api.get('/projects/my/stats')
    stats.value = response.data // Bika imibare ya backend
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
})
</script>