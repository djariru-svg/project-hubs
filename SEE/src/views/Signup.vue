<template>
  <div class="min-h-screen flex items-center justify-center bg-bg-gray px-6 py-12">
    <div class="max-w-lg w-full">
      
      <!-- Header -->
      <div class="text-center mb-10">
        <router-link to="/" class="inline-flex items-center gap-2 mb-4">
          <div class="bg-primary text-white p-2 rounded-xl font-bold text-xl">PH</div>
          <span class="text-2xl font-bold text-text-dark">Project Hubs</span>
        </router-link>
        <h2 class="text-3xl font-bold text-text-dark">Create an account</h2>
        <p class="text-text-gray mt-2">Join the marketplace for student developers</p>
      </div>

      <!-- Card -->
      <div class="card p-8">
        <form @submit.prevent="handleSignup" class="space-y-5">
          
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-text-dark mb-1">Full Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Eric Mugisha" 
              class="input-field" 
              required 
            />
          </div>

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

          <!-- University Dropdown -->
          <div>
            <label class="block text-sm font-medium text-text-dark mb-1">University</label>
            <select v-model="form.university" class="input-field bg-white" required>
              <option value="" disabled>Select your university</option>
              <option value="UR">University of Rwanda (UR)</option>
              <option value="RP">Rwanda Polytechnic (RP)</option>
              <option value="AUCA">Adventist University of Central Africa (AUCA)</option>
              <option value="CMU">Carnegie Mellon University Africa (CMU)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-text-dark mb-1">Password</label>
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Create a strong password" 
                class="input-field pr-12" 
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

          <!-- Role Selection (Student vs Buyer) -->
          <div>
            <label class="block text-sm font-medium text-text-dark mb-3">I am a:</label>
            <div class="grid grid-cols-2 gap-4">
              <label class="cursor-pointer">
                <input type="radio" v-model="form.role" value="student" class="peer sr-only" />
                <div class="p-4 rounded-xl border-2 border-border peer-checked:border-primary peer-checked:bg-primary-light transition-all text-center">
                  <div class="text-2xl mb-1">🎓</div>
                  <div class="font-semibold text-sm">Student (Seller)</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" v-model="form.role" value="buyer" class="peer sr-only" />
                <div class="p-4 rounded-xl border-2 border-border peer-checked:border-primary peer-checked:bg-primary-light transition-all text-center">
                  <div class="text-2xl mb-1">🛒</div>
                  <div class="font-semibold text-sm">Buyer</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <input type="checkbox" id="terms" class="mt-1 w-4 h-4 text-primary rounded border-border focus:ring-primary" required />
            <label for="terms" class="ml-2 text-sm text-text-gray">
              I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a> and <a href="#" class="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn-primary w-full flex justify-center items-center gap-2"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
          </button>
        </form>
      </div>

      <!-- Footer Link -->
      <p class="text-center text-text-gray mt-8">
        Already have an account?
        <router-link to="/login" class="text-primary font-semibold hover:underline">Sign in</router-link>
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
    // Vugana na Backend
    const response = await api.post('/auth/register', form.value)
    
    // Bika umukoresha muri Pinia (State)
    userStore.setUser(response.data.user, response.data.token)
    
    alert('Account created successfully! Welcome to Project Hubs.')
    router.push('/dashboard')
  } catch (error) {
    // Garagaza error iyo ibaye (nka niba email isanzweho)
    alert(error.response?.data?.message || 'Signup failed. Check if backend is running.')
  } finally {
    isLoading.value = false
  }
}
</script>