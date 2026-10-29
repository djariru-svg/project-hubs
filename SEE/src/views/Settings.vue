<template>
  <div class="bg-bg-gray dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />
    
    <div class="max-w-3xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">Igenamiterere (Settings)</h1>

      <div class="card border border-border dark:border-gray-700">
        
        <div v-if="successMsg" class="mb-6 p-4 rounded-lg bg-green-100 text-green-700 border border-green-200">
          {{ successMsg }}
        </div>
        <div v-if="errorMsg" class="mb-6 p-4 rounded-lg bg-danger/10 text-danger border border-danger/20">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-6">
          
          <!-- Izina -->
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Amazina Yawe</label>
            <input v-model="form.name" type="text" class="input-field" required />
          </div>

          <!-- Email (Ntihinduka) -->
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Email (Ntihinduka)</label>
            <input :value="userStore.user?.email" type="email" class="input-field bg-gray-100 dark:bg-gray-800 cursor-not-allowed" disabled />
          </div>

          <!-- Kaminuza -->
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Kaminuza</label>
            <input v-model="form.university" type="text" class="input-field" required />
          </div>

          <!-- Password Nshya (Optional) -->
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Password Nshya (Ntiburanze)</label>
            <input v-model="form.password" type="password" placeholder="Siga ubusa niba udashaka kuyihindura" class="input-field" />
            <p class="text-xs text-text-gray mt-1">Niba ushaka guhindura password, yandike hano.</p>
          </div>

          <div class="pt-4 border-t border-border dark:border-gray-700 flex justify-end">
            <button type="submit" class="btn-primary" :disabled="isLoading">
              {{ isLoading ? 'Turabika...' : 'Bika Impinduka' }}
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../services/api'

const userStore = useUserStore()
const router = useRouter()

const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const form = ref({
  name: '',
  university: '',
  password: ''
})

// Iyo page ifungutse, shyira amakuru asanzwe muri form
onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  form.value.name = userStore.user?.name || ''
  form.value.university = userStore.user?.university || ''
})

async function handleUpdate() {
  isLoading.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const response = await api.put('/auth/profile', form.value)
    
    // Vugurura amakuru muri Pinia store
    userStore.updateUser(response.data.user)
    
    successMsg.value = 'Umwirondoro wahinduwe neza!'
    form.value.password = '' // Siba password nyuma yo kuyibika
    
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Guhindura byanze. Ongera ugerageze.'
  } finally {
    isLoading.value = false
  }
}
</script>