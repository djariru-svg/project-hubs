<template>
  <footer class="bg-[#0F172A] text-gray-300 pt-16 pb-8 mt-20 font-sans border-t-4 border-primary">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- Top Section: Brand + Newsletter -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand & Description -->
        <div class="lg:col-span-2">
          <router-link to="/" class="flex items-center gap-3 mb-4 group">
            <!-- Logo Icon -->
            <div class="bg-primary text-white p-2 rounded-xl font-bold text-xl group-hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <span class="text-2xl font-bold text-white tracking-tight">Project Hubs <span class="text-primary">Marketplace</span></span>
          </router-link>
          <p class="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            The premier marketplace for African university students to buy, sell, and discover top-tier software projects. Built for students, by students.
          </p>
          
          <!-- Social Icons -->
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.79 2h-1.21v7h-2v-7h-1.35v-2h1.35v-1.405c0-1.882.905-2.595 2.65-2.595h1.35v2z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Explore</h4>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/browse" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Browse Projects</router-link></li>
            <li><router-link to="/sell" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Sell a Project</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Dashboard</router-link></li>
            <li><router-link to="/cart" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> My Cart</router-link></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Support</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Help Center</a></li>
            <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Terms of Service</a></li>
            <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Privacy Policy</a></li>
            <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span>→</span> Contact Us</a></li>
          </ul>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="bg-white/5 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div>
          <h3 class="text-white text-lg font-bold mb-1">Stay in the loop</h3>
          <p class="text-gray-400 text-sm">Get the latest projects and updates delivered to your inbox.</p>
        </div>
        <form @submit.prevent="subscribe" class="flex w-full md:w-auto gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64 transition-all"
            required
          />
          <button type="submit" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap shadow-lg shadow-primary/30">
            Subscribe
          </button>
        </form>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} Project Hubs Marketplace. All rights reserved.</p>
        <div class="flex items-center gap-2">
          <span>Made with</span>
          <span class="text-danger">❤</span>
          <span>in Rwanda 🇷🇼</span><br>
          <span>powerd by</span>
          <span>dt1</span>
        </div>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white transition-colors">Terms</a>
          <a href="#" class="hover:text-white transition-colors">Privacy</a>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
function subscribe() {
  alert('Thank you for subscribing to our newsletter!')
}
</script>