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
    currentSongs:null,
    bans:[],

    //state
    showDrawer:false,
  },
  mutations: {
    saveUserData(state,{email,token,image,name}){
      state.email = email;
      state.image = image
      state.name = name
      
      Cookies.set('token',token)
    },
    setTitle:(state,payload) => (state.pageTitle = payload),
    setSubmissionsData:(state,payload) => {
      state.currentSongs = payload.accpeted
      state.myVote = payload.myVote
      state.isAdmin = payload.isAdmin
    },
    setAdminData:(state,payload) => {
      state.submissions = payload.submissions
      state.bans = payload.bans
    },
    voteForSong:(state,newSongId) => {
      const newSelectedIndex = state.currentSongs.findIndex((item) => item._id == newSongId)
      const oldSelectedIndex = state.currentSongs.findIndex((item) => item._id == state.myVote)
      state.currentSongs[newSelectedIndex].votes++
      
      if(oldSelectedIndex != -1){
        state.currentSongs[oldSelectedIndex].votes--
      }

      state.myVote = newSongId
    },
    removeSong:(state,songId) => {
      state.submissions = state.submissions.filter(i => i._id != songId)
    },
    addBan:(state,payload) => state.bans.push(payload),
    showDrawer:(state) => state.showDrawer = true,
    hideDrawer:(state) => state.showDrawer = false,
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
