import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
import SubmitPage from '../views/Submit.vue'
import Admin from '../views/Admin.vue'
import axios from 'axios'


Vue.use(VueRouter)

//route guard
const onlyLogin = (to,from,next) => {
  if(!Cookies.get('token')){
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
    component: Login,
    beforeEnter(to,from,next){
      if(Cookies.get('token')){
        next('/vote')
        return
      }
      next()
    }
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
    component: Admin,
    async beforeEnter(to,from,next){
      //checks if uses in logged in
      if(!Cookies.get('token')){
        console.log('user not logged in redirecting')
        next('/')
        return
      }

      await axios.get('/api/auth/isAdmin').catch(() => {
        console.log('user not admin')
        next('/vote')
        return
      })
      
      next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
