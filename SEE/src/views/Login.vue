<template>
  <div class="min-h-screen flex bg-surface dark:bg-gray-900 transition-colors duration-300">
    
    <!-- IBUMOSO: Brand & Marketing (Bihishe kuri telefone) -->
    <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-purple-700 text-white flex-col justify-between p-12 relative overflow-hidden">
      
      <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <router-link to="/" class="relative z-10 flex items-center gap-2">
        <div class="bg-white text-primary p-2 rounded-xl font-bold text-xl">PH</div>
        <span class="text-2xl font-bold">Project Hubs</span>
      </router-link>

      <div class="relative z-10">
        <h1 class="text-4xl font-bold mb-6 leading-tight">
          Isoko ry'umwihariko ku banyeshuri ba Africa bakora software.
        </h1>
        <p class="text-white/80 text-lg mb-8">
          Gurisha kandi ugure software nziza, embedded systems, na AI models zakozwe n'abanyeshuri b'ingeri ya mbere muri kaminuza.
        </p>
        
        <div class="flex items-center gap-4">
          <div class="flex -space-x-3">
            <div class="w-10 h-10 rounded-full bg-orange-400 border-2 border-primary flex items-center justify-center font-bold">E</div>
            <div class="w-10 h-10 rounded-full bg-green-400 border-2 border-primary flex items-center justify-center font-bold text-primary">D</div>
            <div class="w-10 h-10 rounded-full bg-blue-400 border-2 border-primary flex items-center justify-center font-bold">J</div>
          </div>
          <p class="text-sm text-white/90">Ifatanye n'abanyeshuri 1,000+ basanzwe bacuruza.</p>
        </div>
      </div>

      <div class="relative z-10 text-sm text-white/60">
        © 2025 Project Hubs Marketplace.
      </div>
    </div>

    <!-- IBURYO: Ifishi (Form) -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-md">
        
        <div class="lg:hidden text-center mb-10">
          <router-link to="/" class="inline-flex items-center gap-2">
            <div class="bg-primary text-white p-2 rounded-xl font-bold text-xl">PH</div>
            <span class="text-2xl font-bold text-text-dark dark:text-white">Project Hubs</span>
          </router-link>
        </div>

        <div class="text-center lg:text-left mb-8">
          <h2 class="text-3xl font-bold text-text-dark dark:text-white mb-2">Murakaza neza</h2>
          <p class="text-text-gray">Injira mu konti yawe kugira ngo ukomeze.</p>
        </div>

        <div v-if="errorMsg" class="mb-6 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-2">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="wowe@kaminuza.ac.rw" 
              class="input-field bg-gray-50 dark:bg-gray-800" 
              required 
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-text-dark dark:text-gray-300">Password</label>
              <a href="#" class="text-sm text-primary hover:underline font-medium">Wibagiwe?</a>
            </div>
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="input-field bg-gray-50 dark:bg-gray-800 pr-12" 
                required 
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray hover:text-primary transition"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </button>
            </div>
          </div>

          <!-- Remember -->
          <div class="flex items-center">
            <input type="checkbox" id="remember" class="w-4 h-4 text-primary rounded border-border focus:ring-primary bg-gray-50 dark:bg-gray-800" />
            <label for="remember" class="ml-2 text-sm text-text-gray">Unyibuke</label>
          </div>

          <button 
            type="submit" 
            class="btn-primary w-full flex justify-center items-center gap-2 mt-4"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isLoading ? 'Turacyinjira...' : 'Injira' }}</span>
          </button>
        </form>

        <p class="text-center text-text-gray mt-8">
          Nta konti ufite?
          <router-link to="/signup" class="text-primary font-semibold hover:underline">Kora indi nshya</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import api from '../services/api'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true
  
  try {
    const response = await api.post('/auth/login', form.value)
    userStore.setUser(response.data.user, response.data.token)
    alert(`Murakaza neza, ${response.data.user.name}! 👋`)
    
    const redirectPath = route.query.redirect || 
                        (response.data.user.role === 'buyer' ? '/buyer-dashboard' : '/dashboard')
    router.push(redirectPath)
    
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Kwinjira byanze. Reba email na password.'
  } finally {
    isLoading.value = false
  }
}
</script>