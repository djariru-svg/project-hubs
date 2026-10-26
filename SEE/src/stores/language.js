import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  // 'rw' ni Kinyarwanda, 'en' ni English
  const currentLang = ref(localStorage.getItem('lang') || 'rw')

  const translations = {
    rw: {
      dashboard: 'Ikibaho (Dashboard)',
      welcome: 'Murakaza neza',
      browse: 'Reba Projects',
      sell: 'Gurisha Project',
      login: 'Injira',
      signup: 'Iyandikishe',
      logout: 'Sohoka',
      settings: 'Igenamiterere',
      myProjects: 'Projects Zanjye',
      earnings: 'Amafaranga Yinjiye',
      rating: 'Amanota'
    },
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome back',
      browse: 'Browse Projects',
      sell: 'Sell Project',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      settings: 'Settings',
      myProjects: 'My Projects',
      earnings: 'Earnings',
      rating: 'Rating'
    }
  }

  // Iyi function isubiza amagambo mu rurimi rwahiswemo
  const t = computed(() => (key) => translations[currentLang.value][key] || key)

  function toggleLanguage() {
    currentLang.value = currentLang.value === 'rw' ? 'en' : 'rw'
    localStorage.setItem('lang', currentLang.value)
  }

  return { currentLang, toggleLanguage, t }
})