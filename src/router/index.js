import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import Store from '../store/index'

import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
import SubmitPage from '../views/Submit.vue'
import NotFound404 from '../views/404.vue'

//admin
import Admin from '../views/admin/Admin.vue'
import Bans from '../views/admin/Bans.vue'
import FutureSongs from '../views/admin/FutureSongs.vue'


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

const onlyAdmin = async (to,from,next) => {
  //checks if uses in logged in
  if(!Cookies.get('token') || !Store.state.isAdmin){
    console.log('user not allowed')
    next('/')
    return
  }
  next()
}

//routes
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
    path: '*',
    name: '404',
    component: NotFound404,
  },
  //admin
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter:onlyAdmin,
  },
  {
    path: '/admin/bans',
    name: 'bans',
    component: Bans,
    beforeEnter:onlyAdmin,
  },
  {
    path: '/admin/future-songs',
    name: 'future-songs',
    component: FutureSongs,
    beforeEnter:onlyAdmin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
