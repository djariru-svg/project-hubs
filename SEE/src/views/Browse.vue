<template>
  <div>
    <Navbar />
    <div class="max-w-7xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-8">Browse Projects ({{ projects.length }})</h1>
      
      <div v-if="isLoading" class="text-center py-20">Loading projects...</div>
      
      <div v-else-if="projects.length === 0" class="text-center py-20 text-gray-500">
        Nta projects zirabaho. Banza ushyireho iyawe!
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Dukoresha ProjectCard yacu isanzwe -->
        <ProjectCard v-for="project in projects" 
                     :key="project.id" 
                     :project="{
                       id: project.id,
                       title: project.title,
                       seller: project.seller_name,
                       rating: 5.0, // Placeholder kugeza dushyizeho reviews
                       reviews: 0,
                       price: project.price
                     }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import ProjectCard from '../components/ProjectCard.vue'
import api from '../services/api'

const projects = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get('/projects')
    projects.value = response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    isLoading.value = false
  }
})
</script>