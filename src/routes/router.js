import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import { auth } from '../firebase/firebaseAuth';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth= to.matched.some(record => record.meta.requiresAuth);
  console.log('currentUser', auth.currentUser);
  if (requiresAuth && !auth.currentUser) {
      next('/');
  } else {
      next();
  }
})

export default router;