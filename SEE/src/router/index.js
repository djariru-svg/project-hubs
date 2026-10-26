import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('../views/Home.vue') 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    path: '/signup', 
    name: 'Signup', 
    component: () => import('../views/Signup.vue') 
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
    path: '/sell', 
    name: 'Sell', 
    component: () => import('../views/Sell.vue') 
  },
  { 
    path: '/cart', 
    name: 'Cart', 
    component: () => import('../views/Cart.vue') 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: () => import('../views/Dashboard.vue') 
  },
  // IZI NZIYA
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
  // 404 (Iyi igomba kuba iheruka buri gihe)
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: () => import('../views/NotFound.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// ==========================================
// UMUZAMU (ROUTE GUARD)
// ==========================================
// Iyi code ireba niba umukoresha afite Token mbere yo kumureka kujya kuri Dashboard cyangwa Sell
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Niba ashatse kujya kuri 'Sell' cyangwa 'Dashboard' ariko nta Token afite
  if ((to.name === 'Sell' || to.name === 'Dashboard') && !token) {
    next({ name: 'Login' }); // Mujyane kuri Login
  } else {
    next(); // Reka agende
  }
});

export default router