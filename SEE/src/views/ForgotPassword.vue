<template>
  <div class="min-h-screen flex items-center justify-center bg-bg-gray px-6 py-12">
    <div class="max-w-md w-full">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-text-dark">Forgot Password?</h2>
        <p class="text-text-gray mt-2">Enter your email to reset your password</p>
      </div>
      
      <div class="card p-8">
        <div v-if="successMsg" class="mb-4 p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 text-sm text-center">
          {{ successMsg }}
        </div>
        
        <div v-if="errorMsg" class="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center">
          {{ errorMsg }}
        </div>
        
        <form @submit.prevent="handleReset" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-text-dark mb-1">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="you@university.edu" 
              class="input-field" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            class="btn-primary w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
      </div>
      
      <p class="text-center text-text-gray mt-8">
        <router-link to="/login" class="text-primary font-semibold hover:underline">
          ← Back to Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const email = ref('')
const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function handleReset() {
  errorMsg.value = ''
  successMsg.value = ''
  isLoading.value = true
  
  try {
    await api.post('/auth/forgot-password', { email: email.value })
    successMsg.value = 'Reset link sent to your email!'
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Failed to send reset link'
  } finally {
    isLoading.value = false
  }
}
</script>