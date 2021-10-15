import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //user data
    email:null,
    image:null,
    name:null,
    pageTitle:null,
    isAdmin:null,
    myVote:null,
    
    //submissions
    submissions:null,
    acceptedSubmissions:null,
    bans:null,


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
    setSubmissionsData:(state,payload) => {
      state.acceptedSubmissions = payload.accpeted
      state.myVote = payload.myVote
      state.isAdmin = payload.isAdmin
    },
    setAdminData:(state,payload) => {
      state.submissions = payload.submissions
      state.bans = payload.bans
    },
    voteForSong:(state,newSongId) => {
      const newSelectedIndex = state.acceptedSubmissions.findIndex((item) => item._id == newSongId)
      const oldSelectedIndex = state.acceptedSubmissions.findIndex((item) => item._id == state.myVote)
      state.acceptedSubmissions[newSelectedIndex].votes++
      state.acceptedSubmissions[oldSelectedIndex].votes--
      state.myVote = newSongId
      console.log(state.acceptedSubmissions[newSelectedIndex]._id)
    }
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
