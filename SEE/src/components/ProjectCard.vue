<template>
  <router-link :to="`/project/${project.id}`" class="group bg-surface dark:bg-gray-800 rounded-card shadow-soft hover:shadow-card transition-all duration-200 overflow-hidden block border border-transparent dark:border-gray-700">
    
    <!-- IFOTO Y'UMWANYA WA MBERE -->
    <div class="aspect-video bg-bg-gray dark:bg-gray-700 relative overflow-hidden">
      <img v-if="project.image_url" :src="project.image_url" alt="Project Image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      
      <!-- Niba ifoto itahari, werekana iyi icon -->
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-purple-600">
        <span class="text-white text-4xl">📦</span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-semibold text-text-dark dark:text-white group-hover:text-primary transition truncate">
        {{ project.title }}
      </h3>
      <p class="text-sm text-text-gray dark:text-gray-400 mt-1">by {{ project.seller }}</p>

      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center gap-1 text-sm dark:text-gray-300">
          <span>⭐</span>
          <span class="font-medium">{{ project.rating }}</span>
          <span class="text-text-gray dark:text-gray-500">({{ project.reviews }})</span>
        </div>
        <span class="badge" :class="project.price == 0 ? 'bg-secondary/10 text-secondary' : 'bg-primary-light text-primary dark:bg-primary/20 dark:text-primary-light'">
          {{ project.price == 0 ? 'Free' : `$${project.price}` }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
})
</script>