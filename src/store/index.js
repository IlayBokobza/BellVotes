import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email:null,
    image:null,
    name:null,
    pageTitle:null,
  },
  mutations: {
    saveUserData(state,{email,token,image,name}){
      state.email = email;
      state.image = image
      state.name = name

      //save token to cookies
      Cookies.set('token',token)
    },
    setTitle:(state,payload) => (state.pageTitle = payload),
  },
  actions: {
    signout(){
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
  },
  modules: {
  }
})
