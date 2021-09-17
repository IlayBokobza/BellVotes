import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
import SubmitPage from '../views/Submit.vue'
import Admin from '../views/Admin.vue'


Vue.use(VueRouter)

//route guard
const onlyLogin = (to,from,next) => {
  if(!store.state.email){
    console.log('user not logged in redirecting')
    next('/')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote,
    beforeEnter:onlyLogin,
  },
  {
    path: '/submit',
    name: 'submit-page',
    component: SubmitPage,
    beforeEnter:onlyLogin,
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
