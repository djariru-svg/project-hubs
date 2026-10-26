<template>
  <div class="bg-bg-gray dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary to-purple-600 text-white py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">Ibyerekeye Project Hubs</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Urubuga rwahariwe guhuza abanyeshuri ba Africa bakora software n'ibikoresho by'ikoranabuhanga (Embedded Systems) hamwe n'abakiriya bashaka kugura ibyo bikorwa.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="card">
          <div class="text-4xl mb-4">🎯</div>
          <h2 class="text-2xl font-bold mb-4 text-primary">Intego Yacu (Mission)</h2>
          <p class="text-text-gray leading-relaxed">
            Gutuma buri munyeshuri ufite impano mu gukora software cyangwa embedded systems abona isoko ryizewe ryo kugurisha ibyo yakoze, ndetse agakura mu buryo bw'ubucuruzi.
          </p>
        </div>
        <div class="card">
          <div class="text-4xl mb-4">👁️</div>
          <h2 class="text-2xl font-bold mb-4 text-primary">Icyerekezo (Vision)</h2>
          <p class="text-text-gray leading-relaxed">
            Kubaka ubukungu bushingiye ku bumenyi mu rubyiruko rw'Africa, aho umunyeshuri wese yashobora kubaho akoresheje ubuhanga bwe mu ikoranabuhanga.
          </p>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="bg-surface py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Indangagaciro Zacu</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🤝</div>
            <h3 class="text-xl font-bold mb-2">Kwizerana</h3>
            <p class="text-text-gray text-sm">Dukorana mu mucyo kandi twizera abakoresha bacu bose.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">💡</div>
            <h3 class="text-xl font-bold mb-2">Ubuhanga</h3>
            <p class="text-text-gray text-sm">Dushishikariza guhanga udushya no gukoresha ikoranabuhanga rigezweho.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🌍</div>
            <h3 class="text-xl font-bold mb-2">Ubumwe</h3>
            <p class="text-text-gray text-sm">Guhuza abanyeshuri ba Africa bose mu rwego rumwe rw'ubucuruzi.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-4xl mx-auto px-6 py-20 text-center">
      <h2 class="text-3xl font-bold mb-4">Witeguye gutangira?</h2>
      <p class="text-text-gray mb-8">Injira mu rubyiruko rw'abahanga bahindura ejo hazaza h'ikoranabuhanga muri Africa.</p>
      <router-link to="/signup" class="btn-primary inline-block">
        Iyandikishe Ubu
      </router-link>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>