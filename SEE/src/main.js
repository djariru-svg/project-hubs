import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia() // <-- 1. Tangiza Pinia ukwayo hano

app.use(pinia)              // <-- 2. Yishyire muri app
app.use(router)
app.mount('#app')