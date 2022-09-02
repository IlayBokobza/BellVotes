import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import axios from 'axios'

Vue.config.productionTip = false

const getData = async () => {
  
  let {data:accpeted} = await axios.get('/api/submit/accpeted')
  console.log('got songs from server')
  const {data:myVote} = await axios.get('/api/submit/myVote')
  console.log('got user\'s vote from server')
  
  try{
    var {status:isAdmin} = await axios.get('/api/auth/isAdmin')
  }
  catch({response}){
    isAdmin = response.status
  }
  console.log('got user\'s admin status from server')

  accpeted = accpeted.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
  store.commit('setSubmissionsData',{accpeted,myVote,isAdmin:isAdmin === 200})

  if(isAdmin !== 200) return;
  console.log('user is admin')

  const {data:submissions} = await axios.get('/api/submit')
  console.log('got submissions from server')

  const {data:bans} = await axios.get('/api/submit/bans')
  console.log('got bans record from server')

  store.commit('setAdminData',{submissions,bans})
}

const loadApp = () => {
  try{
    if(!window.gapi){
      throw new Error('no gappi')
    }

    console.log('gapi loaded')
    window.gapi.load('auth2',async function() {
      console.log('auth2 loaded')

      //sets up google auth
      window.gapi.auth2.init()
      const ga = window.gapi.auth2.getAuthInstance()
      
      let hasSignedIn = false

      //times out after 10 seconds
      const timer = setTimeout(() => {
        if(!hasSignedIn){
          console.log('aborting sign in after 10 seconds.')
          Cookies.remove('token')
          new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app')
        }
      },10000)

      ga.isSignedIn.listen(async (isSignedIn) => {
        hasSignedIn = true
        console.log('sign in state change')

        //when users signs in
        if(isSignedIn){
          try{
            console.log('user is signed in')
            const user = ga.currentUser.get()
            const profile = user.getBasicProfile()
  
            store.commit('saveUserData',{
              email:profile.getEmail(),
              image:profile.getImageUrl(),
              name:profile.getName(),
              token:user.getAuthResponse().id_token
            })
            
            await getData()
          }
          catch{
            console.log('error logging in, logging out.')
            Cookies.remove('token')
          }
        }

        //when uses signs out
        else{
          console.log('user is not signed in')
          Cookies.remove('token')  
        }

        //loades vue
        new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
      })

      if(!Cookies.get('token')){
        clearTimeout(timer)
        console.log('user not signed in')
        new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
        return
      }
    });
  }
  catch{
    setTimeout(loadApp,100)
  }
}

loadApp()