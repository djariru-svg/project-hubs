<template>
  <div>
    <Navbar />

       <!-- HERO SECTION NSHYA: Ifite image muri background -->
    <section class="relative bg-gray-900 text-white py-24 px-6 overflow-hidden flex items-center min-h-[500px]">
      
      <!-- 1. IMAGE YIRI MURI BACKGROUND -->
      <img :src="heroImage" alt="Hero Background" 
           class="absolute inset-0 w-full h-full object-cover opacity-40" />
      
      <!-- 2. GRADIENT YO HEJURU KUGIRA NGO INYANDIKO ISOMEKE (Overlay) -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-900/80 mix-blend-multiply"></div>

      <!-- 3. INYANDIKO (Ziri hejuru y'image) -->
      <div class="relative z-10 max-w-7xl mx-auto w-full">
        <div class="max-w-2xl">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Buy & Sell African Software Projects
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            The marketplace for African and world software and embedded system projects.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/browse" 
                         class="bg-white text-primary font-semibold 
                                px-8 py-4 rounded-btn hover:bg-gray-100 transition shadow-lg">
              Browse Projects
            </router-link>
            <router-link to="/sell" 
                         class="border-2 border-white text-white font-semibold 
                                px-8 py-4 rounded-btn hover:bg-white/20 transition backdrop-blur-sm">
              Sell Yours
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Search bar (Iyi iguma aho iri) -->
    <div class="max-w-3xl mx-auto -mt-8 px-6 relative z-20">
      <div class="bg-surface dark:bg-gray-800 rounded-card shadow-card p-2 flex gap-2 border border-border dark:border-gray-700">
        <input type="text" placeholder="Search projects, tech, or universities..."
               class="flex-1 px-4 py-3 focus:outline-none bg-transparent dark:text-white" />
        <button class="btn-primary">Search</button>
      </div>
    </div>


    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold mb-8">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectCard v-for="project in projects" 
                     :key="project.id" 
                     :project="project" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ProjectCard from '../components/ProjectCard.vue'
import heroImage from '../assets/dt1.png'

const projects = [
  { id: 1, title: 'Library Management System', seller: 'Eric M.', rating: 4.5, reviews: 24, price: 50 },
  { id: 2, title: 'Chat Application', seller: 'Diane K.', rating: 5.0, reviews: 18, price: 30 },
  { id: 3, title: 'AI Chatbot', seller: 'Asina M.', rating: 4.8, reviews: 12, price: 0 },
  { id: 4, title: 'E-commerce Store', seller: 'Eddy N.', rating: 4.2, reviews: 30, price: 120 },
]
</script>