import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import Default from '../components/Default.vue'
import DefaltLayout from '../components/DefaultLayout.vue'
import store from '../store'
import Dashboard from '../views/Dashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Verify from '../views/Verify.vue'
const routes = [
  {
    path: '/',
    name: 'Frontend',
    component: Default,
    redirect: { name: 'Home' },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/admin',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: DefaltLayout,
    meta: { requiresAuth: true },
    children: [{ path: '/dashboard', name: 'Dashboard', component: Dashboard }],
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        meta: { isGuest: true },
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        meta: { isGuest: true },
        component: Register,
      },
      {
        path: '/verify',
        name: 'Verify',
        meta: { isGuest: true },
        component: Verify,
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        meta: { isGuest: true },
        component: ForgotPassword,
      },
      {
        path: '/reset-password',
        name: 'ResetPassword',
        meta: { isGuest: true },
        component: ResetPassword,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  let authenticated = false
  store
    .dispatch('getUser')
    .then((res) => {
      if (res.status === 200) {
        authenticated = true
      }
    })
    .then(() => {
      if (to.meta.requiresAuth && !authenticated) {
        next({ name: 'Login' })
      } else if (authenticated && to.meta.isGuest) {
        next({ name: 'Dashboard' })
      } else {
        next()
      }
    })
})

export default router
