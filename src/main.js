import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

const loadApp = () => {
  try{
    if(!window.gapi){
      throw new Error('no gappi')
    }

    window.gapi.load('auth2', function() {

      //sets up google auth
      window.gapi.auth2.init()
      const ga = window.gapi.auth2.getAuthInstance()
      
      ga.isSignedIn.listen((isSignedIn) => {

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
          
        }

        //when uses signs out
        else{
          Cookies.remove('token')  
        }
      })

      //loades vue
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    });
  }
  catch{
    setTimeout(loadApp,100)
  }
}
loadApp()