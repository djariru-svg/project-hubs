<template>
  <Navbar />
  <router-view />
  <Footer />
  <ToastContainer />
</template>

<script setup>
import ToastContainer from '@/components/ToastContainer.vue'
</script>