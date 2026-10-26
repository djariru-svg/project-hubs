<template>
 <div class="bg-bg-gray dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />

    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        
        <!-- Left: Info -->
        <div>
          <h1 class="text-4xl font-bold mb-6 text-text-dark">Twandikire</h1>
          <p class="text-text-gray mb-8 leading-relaxed">
            Ufite ikibazo, igitekerezo, cyangwa ushaka gukorana natwe? Uzuza iyi fomu cyangwa uduhamagare kuri nimero ziri aha.
          </p>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl shrink-0">📧</div>
              <div>
                <h4 class="font-bold text-lg">Email</h4>
                <p class="text-text-gray">support@projecthubs.rw</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl shrink-0">📞</div>
              <div>
                <h4 class="font-bold text-lg">Telefone</h4>
                <p class="text-text-gray">+250 788 000 000</p>
                <p class="text-text-gray">+250 722 000 000</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl shrink-0">📍</div>
              <div>
                <h4 class="font-bold text-lg">Aho duherereye</h4>
                <p class="text-text-gray">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="card">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <h2 class="text-2xl font-bold mb-4">Ohereza Ubutumwa</h2>
            
            <div>
              <label class="block text-sm font-medium mb-1">Amazina yawe</label>
              <input v-model="form.name" type="text" placeholder="Urugero: Eric Mugisha" class="input-field" required />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Email yawe</label>
              <input v-model="form.email" type="email" placeholder="you@example.com" class="input-field" required />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Ubutumwa</label>
              <textarea v-model="form.message" placeholder="Andika ubutumwa bwawe hano..." class="input-field h-32" required></textarea>
            </div>

            <button type="submit" class="btn-primary w-full" :disabled="isSending">
              {{ isSending ? 'Iratwara...' : 'Ohereza Ubutumwa' }}
            </button>
          </form>
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const isSending = ref(false)
const form = ref({
  name: '',
  email: '',
  message: ''
})

function handleSubmit() {
  isSending.value = true
  // Hano dushobora guhuza na backend nyuma.
  setTimeout(() => {
    alert('Ubutumwa bwawe bwoherejwe neza! Tuzakwandikira vuba.')
    form.value = { name: '', email: '', message: '' }
    isSending.value = false
  }, 1000)
}
</script>