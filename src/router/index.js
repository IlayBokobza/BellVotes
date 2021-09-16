import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
import SubmitPage from '../views/Submit.vue'
import Admin from '../views/Admin.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote
  },
  {
    path: '/submit',
    name: 'submit-page',
    component: SubmitPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
