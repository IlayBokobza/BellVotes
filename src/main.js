import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import axios from 'axios'

Vue.config.productionTip = false

const getData = async () => {
  let {data:accpeted} = await axios.get('/api/submit/accpeted')
  const {data:myVote} = await axios.get('/api/submit/myVote')
  
  try{
    var {status:isAdmin} = await axios.get('/api/auth/isAdmin')
  }
  catch({response}){
    isAdmin = response.status
  }
  accpeted = accpeted.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
  store.commit('setSubmissionsData',{accpeted,myVote,isAdmin:isAdmin === 200})

  if(isAdmin !== 200) return;

  const {data:submissions} = await axios.get('/api/submit')
  const {data:bans} = await axios.get('/api/submit/bans')

  store.commit('setAdminData',{submissions,bans})
}

const loadApp = () => {
  try{
    if(!window.gapi){
      throw new Error('no gappi')
    }

    window.gapi.load('auth2',function() {

      //sets up google auth
      window.gapi.auth2.init()
      const ga = window.gapi.auth2.getAuthInstance()
      
      ga.isSignedIn.listen(async (isSignedIn) => {

        //when users signs in
        if(isSignedIn){
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

        //when uses signs out
        else{
          Cookies.remove('token')  
        }

        //loades vue
        new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
      })
    });
  }
  catch{
    setTimeout(loadApp,100)
  }
}

loadApp()