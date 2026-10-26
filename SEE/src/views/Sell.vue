<template>
  <div class="bg-bg-gray dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />
    <div class="max-w-3xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">Gurisha Project Yawe</h1>
      
      <div v-if="errorMsg" class="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger font-medium">
        {{ errorMsg }}
      </div>

      <div class="card border border-border dark:border-gray-700">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- IFOTO (IMAGE UPLOAD) -->
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Ifoto y'Project (Image)</label>
            <div class="border-2 border-dashed border-border dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary transition cursor-pointer relative">
              <input type="file" accept="image/*" @change="handleFileChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              
              <div v-if="!imagePreview" class="text-text-gray">
                <div class="text-4xl mb-2">📸</div>
                <p>Kanda hano ushyireho ifoto cyangwa uyikuremo</p>
              </div>
              
              <!-- Iyi yerekana ifoto mbere yo kuyohereza -->
              <img v-else :src="imagePreview" class="max-h-48 mx-auto rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Izina ry'Project (Title)</label>
            <input v-model="form.title" type="text" placeholder="Urugero: Library Management System" class="input-field" required />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Ibisobanuro (Description)</label>
            <textarea v-model="form.description" placeholder="Sobanura project yawe..." class="input-field h-32" required></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300">Icyiciro (Category)</label>
              <select v-model="form.category" class="input-field" required>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="iot">Embedded / IoT</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300">Ikoranabuhanga (Tech Stack)</label>
              <input v-model="form.tech_stack" type="text" placeholder="Urugero: React, Node.js" class="input-field" required />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300">Igiciro (Price $)</label>
              <input v-model="form.price" type="number" step="0.01" placeholder="50.00" class="input-field" required />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300">Demo URL</label>
              <input v-model="form.demo_url" type="url" placeholder="https://..." class="input-field" />
            </div>
          </div>

          <button type="submit" class="btn-primary w-full flex justify-center" :disabled="isLoading">
            <span v-if="isLoading">Turatwara...</span>
            <span v-else>Publish Project (Tangaza)</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../services/api'

const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

// Aha ni ho tubika ifoto yahiswemo
const selectedFile = ref(null)
const imagePreview = ref(null)

const form = ref({
  title: '', description: '', category: 'web', tech_stack: '', price: '', demo_url: ''
})

// Iyi function ikora iyo umukoresha ashyize ifoto
function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // Kora URL y'agateganyo kugira ngo tuyerekane mbere yo kuyohereza
    imagePreview.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  errorMsg.value = ''
  isLoading.value = true

  try {
    // Dukoresha FormData kugira ngo twohereze amakuru n'ifoto hamwe
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('category', form.value.category)
    formData.append('tech_stack', form.value.tech_stack)
    formData.append('price', form.value.price)
    formData.append('demo_url', form.value.demo_url)
    
    // Niba ifoto ihari, tuyongeraho
    if (selectedFile.value) {
      formData.append('image', selectedFile.value) 
    }

    // Ohereza kuri API (Reba: headers zirahinduka kubera FormData)
    await api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    alert('Project yawe yashyizweho neza!')
    router.push('/browse')
  } catch (err) {
    console.error('Error:', err)
    errorMsg.value = err.response?.data?.message || 'Gushyiraho byanze. Reba niba winjiye.'
  } finally {
    isLoading.value = false
  }
}
</script>