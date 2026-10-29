<template>
  <div class="min-h-screen flex bg-surface dark:bg-gray-900 transition-colors duration-300">
    
    <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-purple-700 text-white flex-col justify-between p-12 relative overflow-hidden">
      
      <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <router-link to="/" class="relative z-10 flex items-center gap-2">
        <div class="bg-white text-primary p-2 rounded-xl font-bold text-xl">PH</div>
        <span class="text-2xl font-bold">Project Hubs</span>
      </router-link>

      <div class="relative z-10">
        <h1 class="text-4xl font-bold mb-6 leading-tight">
          Hindura code yawe mo amafaranga.
        </h1>
        <p class="text-white/80 text-lg mb-8">
          Ifatanye n'umuryango munini w'abanyeshuri ba Africa bakora software. Shyiraho projects zawe, cyangwa iza kugura iz'abandi, utangire kwinjiza amafaranga uyu munsi.
        </p>
      </div>

      <div class="relative z-10 text-sm text-white/60">
        © 2025 Project Hubs Marketplace.
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-md">
        
        <div class="lg:hidden text-center mb-8">
          <router-link to="/" class="inline-flex items-center gap-2">
            <div class="bg-primary text-white p-2 rounded-xl font-bold text-xl">PH</div>
            <span class="text-2xl font-bold text-text-dark dark:text-white">Project Hubs</span>
          </router-link>
        </div>

        <div class="text-center lg:text-left mb-8">
          <h2 class="text-3xl font-bold text-text-dark dark:text-white mb-2">Fungura Konti Nshya</h2>
          <p class="text-text-gray">Tangira kugura no kugurisha projects z'abanyeshuri.</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-4">
          
          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-1">Amazina Yawe</label>
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Eric Mugisha" 
              class="input-field bg-gray-50 dark:bg-gray-800" 
              required 
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-1">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="wowe@kaminuza.ac.rw" 
              class="input-field bg-gray-50 dark:bg-gray-800" 
              required 
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-1">Kaminuza</label>
            <select v-model="form.university" class="input-field bg-gray-50 dark:bg-gray-800" required>
              <option value="" disabled>Hitamo kaminuza yawe</option>
              <option value="UR">University of Rwanda (UR)</option>
              <option value="RP">Rwanda Polytechnic (RP)</option>
              <option value="AUCA">Adventist University of Central Africa (AUCA)</option>
              <option value="CMU">Carnegie Mellon University Africa (CMU)</option>
              <option value="Other">Indi</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Kora ijambo banga rikomeye" 
                class="input-field bg-gray-50 dark:bg-gray-800 pr-12" 
                required 
                minlength="6"
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

          <div>
            <label class="block text-sm font-medium text-text-dark dark:text-gray-300 mb-2">Ndi:</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="cursor-pointer">
                <input type="radio" v-model="form.role" value="student" class="peer sr-only" />
                <div class="p-3 rounded-xl border border-border dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary-light dark:peer-checked:bg-primary/20 transition-all text-center">
                  <div class="text-xl mb-1">🎓</div>
                  <div class="font-semibold text-xs dark:text-white">Umunyeshuri (Ugurisha)</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" v-model="form.role" value="buyer" class="peer sr-only" />
                <div class="p-3 rounded-xl border border-border dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary-light dark:peer-checked:bg-primary/20 transition-all text-center">
                  <div class="text-xl mb-1">🛒</div>
                  <div class="font-semibold text-xs dark:text-white">Umuguzi (Ugura)</div>
                </div>
              </label>
            </div>
          </div>

          <div class="flex items-start mt-4">
            <input type="checkbox" id="terms" class="mt-1 w-4 h-4 text-primary rounded border-border focus:ring-primary bg-gray-50 dark:bg-gray-800" required />
            <label for="terms" class="ml-2 text-xs text-text-gray">
              Ndemeye <a href="#" class="text-primary hover:underline">Amabwiriza</a> na <a href="#" class="text-primary hover:underline">Politiki y'Ibanga</a>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn-primary w-full flex justify-center items-center gap-2 mt-2"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isLoading ? 'Turakora konti...' : 'Fungura Konti' }}</span>
          </button>
        </form>

        <p class="text-center text-text-gray mt-6 text-sm">
          Usanzwe ufite konti?
          <router-link to="/login" class="text-primary font-semibold hover:underline">Injira</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import api from '../services/api'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  name: '',
  email: '',
  university: '',
  password: '',
  role: 'student'
})
const showPassword = ref(false)
const isLoading = ref(false)

async function handleSignup() {
  isLoading.value = true
  
  try {
    const response = await api.post('/auth/register', form.value)
    userStore.setUser(response.data.user, response.data.token)
    alert(`Kwiyandikisha byagenze neza! Murakaza neza, ${response.data.user.name} 🎉`)
    
    const dashboard = form.value.role === 'buyer' ? '/buyer-dashboard' : '/dashboard'
    router.push(dashboard)
    
  } catch (error) {
    alert(error.response?.data?.message || 'Kwiyandikisha byanze')
  } finally {
    isLoading.value = false
  }
}
</script>