<template>
  <div class="min-h-screen flex items-center justify-center bg-bg-gray px-6 py-12">
    <div class="max-w-md w-full">
      
      <!-- Header -->
      <div class="text-center mb-10">
        <router-link to="/" class="inline-flex items-center gap-2 mb-4">
          <div class="bg-primary text-white p-2 rounded-xl font-bold text-xl">PH</div>
          <span class="text-2xl font-bold text-text-dark">Project Hubs</span>
        </router-link>
        <h2 class="text-3xl font-bold text-text-dark">Welcome back</h2>
        <p class="text-text-gray mt-2">Sign in to your account to continue</p>
      </div>

      <!-- Card -->
      <div class="card p-8">
        <!-- Error Message -->
        <div v-if="errorMsg" class="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center font-medium">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-text-dark mb-1">Email Address</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="you@university.edu" 
              class="input-field" 
              required 
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-sm font-medium text-text-dark">Password</label>
              <a href="#" class="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="input-field pr-12" 
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

          <!-- Remember Me -->
          <div class="flex items-center">
            <input type="checkbox" id="remember" class="w-4 h-4 text-primary rounded border-border focus:ring-primary" />
            <label for="remember" class="ml-2 text-sm text-text-gray">Remember me</label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn-primary w-full flex justify-center items-center gap-2"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>
      </div>

      <!-- Footer Link -->
      <p class="text-center text-text-gray mt-8">
        Don't have an account?
        <router-link to="/signup" class="text-primary font-semibold hover:underline">Create one</router-link>
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import api from '../services/api' // <-- Iyi ni nshya

const router = useRouter()
const userStore = useUserStore()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  try {
    // Vugana na Backend
    const response = await api.post('/auth/login', form.value)
    
    // Bika umukoresha muri Pinia
    userStore.setUser(response.data.user, response.data.token)
    
    router.push('/dashboard')
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Login failed. Check backend connection.'
  } finally {
    isLoading.value = false
  }
}
</script>