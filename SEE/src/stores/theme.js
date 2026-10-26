import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Reba niba hari theme yabitswe mbere, cyangwa ujye kuri 'light' (umunsi)
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  // Iyi function ihindura theme
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // Iyi ireba impinduka za theme, igahita ishyira class 'dark' kuri <html> tag
  watch(isDark, (newVal) => {
    if (newVal) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, { immediate: true })

  return { isDark, toggleTheme }
})