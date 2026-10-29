import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  // ========== PUBLIC ROUTES ==========
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guestOnly: true } // ← Gusa abatari logged in
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/Browse.vue')
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  
  // ========== AUTHENTICATED ROUTES ==========
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/buyer-dashboard',
    name: 'BuyerDashboard',
    component: () => import('../views/BuyerDashboard.vue'),
    meta: { requiresAuth: true, role: 'buyer' } // ← Buyer only
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'student' } // ← Seller only
  },
  {
    path: '/sell',
    name: 'Sell',
    component: () => import('../views/Sell.vue'),
    meta: { requiresAuth: true, role: 'student' } // ← Seller only
  },
    { 
    path: '/settings', 
    name: 'Settings', 
    component: () => import('../views/Settings.vue') 
  },
  
  // ========== 404 ==========
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// ==========================================
// ROUTE GUARD YUZUYE
// ==========================================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userStore = useUserStore()
  
  // 1. Niba page isaba authentication kandi user ntiyinjiriye
  if (to.meta.requiresAuth && !token) {
    return next({ 
      name: 'Login', 
      query: { redirect: to.fullPath }
    })
  }
  
  // 2. Niba page ari iy'abashyitsi gusa kandi user yinjiye
  if (to.meta.guestOnly && token) {
    const userRole = userStore.user?.role
    if (userRole === 'buyer') {
      return next({ name: 'BuyerDashboard' })
    } else {
      return next({ name: 'Dashboard' })
    }
  }
  
  // 3. Kugenzura role
  if (to.meta.role && token) {
    const userRole = userStore.user?.role
    
    if (userRole !== to.meta.role) {
      if (userRole === 'buyer') {
        return next({ name: 'BuyerDashboard' })
      } else {
        return next({ name: 'Dashboard' })
      }
    }
  }
  
  next()
})

export default router