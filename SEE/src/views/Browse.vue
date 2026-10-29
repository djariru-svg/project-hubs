<template>
  <div class="min-h-screen bg-bg-gray dark:bg-gray-900 transition-colors">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- ========================================== -->
      <!-- HEADER -->
      <!-- ========================================== -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-text-dark dark:text-white mb-2">
          🌐 Shakisha Projects
        </h1>
        <p class="text-text-gray text-lg">
          Reba projects z'abandi banyeshuri, ugure iyo ushaka
        </p>
      </div>
      
      <!-- ========================================== -->
      <!-- SEARCH & FILTER BAR -->
      <!-- ========================================== -->
      <div class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-border dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <!-- Search Input (8 cols) -->
          <div class="md:col-span-8">
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray">🔍</span>
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="Shakisha project izina, description, cyangwa tech stack..."
                class="input-field pl-12"
              />
              <button 
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-text-gray hover:text-primary transition"
              >
                ✕
              </button>
            </div>
          </div>
          
          <!-- Category Filter (2 cols) -->
          <div class="md:col-span-2">
            <select v-model="selectedCategory" class="input-field">
              <option value="">Ibyiciro Byose</option>
              <option value="web">🌐 Web</option>
              <option value="mobile">📱 Mobile</option>
              <option value="ai">🤖 AI/ML</option>
              <option value="iot">🔌 IoT</option>
            </select>
          </div>
          
          <!-- Sort (2 cols) -->
          <div class="md:col-span-2">
            <select v-model="sortBy" class="input-field">
              <option value="newest">🆕 Nshya</option>
              <option value="oldest">📅 Iza Mbere</option>
              <option value="price-low">💰 Igiciro: Hashe → Hejuru</option>
              <option value="price-high">💰 Igiciro: Hejuru → Hashe</option>
              <option value="name">🔤 Izina (A-Z)</option>
            </select>
          </div>
        </div>
        
        <!-- Advanced Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 pt-4 border-t border-border dark:border-gray-700">
          
          <!-- Price Range -->
          <div class="md:col-span-4">
            <label class="block text-sm font-medium text-text-gray mb-2">
              💵 Igiciro (USD)
            </label>
            <div class="flex gap-2">
              <input 
                v-model.number="minPrice"
                type="number"
                placeholder="Min"
                min="0"
                class="input-field"
              />
              <input 
                v-model.number="maxPrice"
                type="number"
                placeholder="Max"
                min="0"
                class="input-field"
              />
            </div>
          </div>
          
          <!-- Sold Filter -->
          <div class="md:col-span-4 flex items-end">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="hideSold"
                type="checkbox"
                class="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <span class="text-sm text-text-dark dark:text-white">
                Hisha izamaze kugurwa
              </span>
            </label>
          </div>
          
          <!-- View Toggle + Clear Filters -->
          <div class="md:col-span-4 flex items-end justify-end gap-2">
            <button 
              @click="resetFilters"
              class="px-4 py-2 text-sm text-text-gray hover:text-primary border border-border dark:border-gray-700 rounded-lg hover:bg-bg-gray dark:hover:bg-gray-700 transition"
            >
              🔄 Subiza
            </button>
            <div class="flex border border-border dark:border-gray-700 rounded-lg overflow-hidden">
              <button 
                @click="viewMode = 'grid'"
                :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface dark:bg-gray-800 text-text-gray'"
                class="px-3 py-2 transition"
              >
                ▦
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-surface dark:bg-gray-800 text-text-gray'"
                class="px-3 py-2 transition"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
        
        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-border dark:border-gray-700 flex flex-wrap gap-2">
          <span class="text-sm text-text-gray">Active filters:</span>
          
          <span v-if="searchQuery" class="inline-flex items-center gap-1 px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-sm rounded-full">
            🔍 "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-primary-dark">✕</button>
          </span>
          
          <span v-if="selectedCategory" class="inline-flex items-center gap-1 px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-sm rounded-full">
            📁 {{ categoryLabels[selectedCategory] }}
            <button @click="selectedCategory = ''" class="hover:text-primary-dark">✕</button>
          </span>
          
          <span v-if="minPrice || maxPrice" class="inline-flex items-center gap-1 px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-sm rounded-full">
            💰 ${{ minPrice || 0 }} - ${{ maxPrice || '∞' }}
            <button @click="minPrice = null; maxPrice = null" class="hover:text-primary-dark">✕</button>
          </span>
          
          <span v-if="hideSold" class="inline-flex items-center gap-1 px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-sm rounded-full">
            🚫 Hisha izaguzwe
            <button @click="hideSold = false" class="hover:text-primary-dark">✕</button>
          </span>
        </div>
      </div>
      
      <!-- ========================================== -->
      <!-- RESULTS COUNT -->
      <!-- ========================================== -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-text-gray">
          Habonetse projects <strong class="text-text-dark dark:text-white">{{ filteredProjects.length }}</strong>
          <span v-if="filteredProjects.length !== projects.length">
            (mu {{ projects.length }} zose)
          </span>
        </p>
        
        <p class="text-sm text-text-gray">
          Page {{ currentPage }} / {{ totalPages }}
        </p>
      </div>
      
      <!-- ========================================== -->
      <!-- LOADING STATE (Skeleton) -->
      <!-- ========================================== -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-surface dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
          <div class="aspect-video bg-gray-300 dark:bg-gray-700"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-4"></div>
          </div>
        </div>
      </div>
      
      <!-- ========================================== -->
      <!-- ERROR STATE -->
      <!-- ========================================== -->
      <div v-else-if="error" class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center border border-danger/20">
        <div class="text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-2">
          Habaye ikibazo
        </h2>
        <p class="text-danger mb-6">{{ error }}</p>
        <button @click="fetchProjects" 
                class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          🔄 Gerageza Nanone
        </button>
      </div>
      
      <!-- ========================================== -->
      <!-- NO RESULTS STATE -->
      <!-- ========================================== -->
      <div v-else-if="filteredProjects.length === 0" 
           class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center border border-border dark:border-gray-700">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-xl font-semibold text-text-dark dark:text-white mb-2">
          Nta projects zabonetse
        </h2>
        <p class="text-text-gray mb-6">
          {{ projects.length === 0 ? 'Nta projects zirabaho kuri uru rubuga' : 'Gerageza guhindura filters cyangwa amagambo ushakisha' }}
        </p>
        <button v-if="hasActiveFilters"
                @click="resetFilters" 
                class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          🔄 Subiza Filters Zose
        </button>
        <router-link v-else
                     to="/sell" 
                     class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition">
          ➕ Shyiraho Project Yawe
        </router-link>
      </div>
      
      <!-- ========================================== -->
      <!-- PROJECTS GRID VIEW -->
      <!-- ========================================== -->
      <div v-else-if="viewMode === 'grid'" 
           class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectCard 
          v-for="project in paginatedProjects" 
          :key="project.id" 
          :project="formatProject(project)" 
        />
      </div>
      
      <!-- ========================================== -->
      <!-- PROJECTS LIST VIEW -->
      <!-- ========================================== -->
      <div v-else class="space-y-4">
        <div 
          v-for="project in paginatedProjects" 
          :key="project.id"
          class="bg-surface dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-border dark:border-gray-700 hover:shadow-lg transition flex flex-col md:flex-row"
        >
          <!-- Image -->
          <router-link :to="`/project/${project.id}`" class="md:w-64 flex-shrink-0">
            <img 
              :src="getImageUrl(project.image_url)" 
              :alt="project.title"
              class="w-full h-48 md:h-full object-cover"
            />
          </router-link>
          
          <!-- Content -->
          <div class="flex-1 p-6 flex flex-col">
            <div class="flex justify-between items-start gap-4 mb-2">
              <router-link :to="`/project/${project.id}`" class="flex-1">
                <h3 class="text-xl font-bold text-text-dark dark:text-white hover:text-primary transition">
                  {{ project.title }}
                </h3>
              </router-link>
              <span 
                v-if="project.is_sold"
                class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-bold rounded-full whitespace-nowrap"
              >
                SOLD
              </span>
            </div>
            
            <p class="text-sm text-text-gray mb-3">
              by {{ project.seller_name }} • {{ project.seller_university }}
            </p>
            
            <p class="text-text-gray dark:text-gray-300 line-clamp-2 mb-4 flex-1">
              {{ project.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-primary-light dark:bg-primary/20 text-primary text-xs font-semibold rounded-full">
                {{ categoryLabels[project.category] || project.category }}
              </span>
              <span v-if="project.tech_stack" 
                    class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold rounded-full">
                {{ project.tech_stack }}
              </span>
            </div>
            
            <div class="flex justify-between items-center pt-4 border-t border-border dark:border-gray-700">
              <span class="text-2xl font-bold text-primary">
                {{ project.price == 0 ? 'Free' : `$${project.price}` }}
              </span>
              <router-link 
                :to="`/project/${project.id}`"
                class="btn-primary"
              >
                Reba Byose →
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ========================================== -->
      <!-- PAGINATION -->
      <!-- ========================================== -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
        <button 
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          class="px-3 py-2 rounded-lg bg-surface dark:bg-gray-800 border border-border dark:border-gray-700 text-text-dark dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-gray dark:hover:bg-gray-700 transition"
        >
          ⟪
        </button>
        
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg bg-surface dark:bg-gray-800 border border-border dark:border-gray-700 text-text-dark dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-gray dark:hover:bg-gray-700 transition"
        >
          ← Ibibanza
        </button>
        
        <!-- Page Numbers -->
        <div class="flex gap-1">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="currentPage === page 
              ? 'bg-primary text-white' 
              : 'bg-surface dark:bg-gray-800 text-text-gray hover:bg-bg-gray dark:hover:bg-gray-700'"
            class="w-10 h-10 rounded-lg border border-border dark:border-gray-700 font-semibold transition"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg bg-surface dark:bg-gray-800 border border-border dark:border-gray-700 text-text-dark dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-gray dark:hover:bg-gray-700 transition"
        >
          Ibikurikira →
        </button>
        
        <button 
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 rounded-lg bg-surface dark:bg-gray-800 border border-border dark:border-gray-700 text-text-dark dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-gray dark:hover:bg-gray-700 transition"
        >
          ⟫
        </button>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import ProjectCard from '../components/ProjectCard.vue'
import Footer from '../components/Footer.vue'
import api from '../services/api'

// ==========================================
// STATE
// ==========================================
const projects = ref([])
const isLoading = ref(true)
const error = ref('')

// Filters
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const minPrice = ref(null)
const maxPrice = ref(null)
const hideSold = ref(false)

// View
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// Category labels
const categoryLabels = {
  web: '🌐 Web',
  mobile: '📱 Mobile',
  ai: '🤖 AI/ML',
  iot: '🔌 IoT'
}

// ==========================================
// COMPUTED
// ==========================================

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || 
         selectedCategory.value || 
         minPrice.value !== null || 
         maxPrice.value !== null || 
         hideSold.value
})

// Filter projects
const filteredProjects = computed(() => {
  let result = [...projects.value]
  
  // 1. Hide sold if checked
  if (hideSold.value) {
    result = result.filter(p => !p.is_sold)
  }
  
  // 2. Filter by search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tech_stack?.toLowerCase().includes(query) ||
      p.seller_name?.toLowerCase().includes(query)
    )
  }
  
  // 3. Filter by category
  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  
  // 4. Filter by price range
  if (minPrice.value !== null) {
    result = result.filter(p => parseFloat(p.price) >= minPrice.value)
  }
  if (maxPrice.value !== null) {
    result = result.filter(p => parseFloat(p.price) <= maxPrice.value)
  }
  
  // 5. Sort
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'oldest':
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'price-low':
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      break
    case 'price-high':
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      break
    case 'name':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
  }
  
  return result
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})

// Visible page numbers (show 5 pages max)
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// ==========================================
// METHODS
// ==========================================

// Reset all filters
function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'newest'
  minPrice.value = null
  maxPrice.value = null
  hideSold.value = false
  currentPage.value = 1
}

// Format project for ProjectCard
function formatProject(project) {
  return {
    id: project.id,
    title: project.title,
    seller: project.seller_name,
    seller_id: project.seller_id,
    category: project.category,
    rating: 5.0,
    reviews: 0,
    price: project.price,
    image_url: project.image_url,
    is_sold: project.is_sold
  }
}

// Get image URL
function getImageUrl(path) {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http')) return path
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  return `${baseUrl}${path}`
}

// Fetch projects from API
async function fetchProjects() {
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await api.get('/projects')
    projects.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Kubona projects byanze'
    console.error('Error fetching projects:', err)
  } finally {
    isLoading.value = false
  }
}

// ==========================================
// WATCHERS
// ==========================================

// Reset page when filters change
watch([searchQuery, selectedCategory, sortBy, minPrice, maxPrice, hideSold], () => {
  currentPage.value = 1
})

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  fetchProjects()
})
</script>