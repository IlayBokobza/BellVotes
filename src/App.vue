<template>
  <div id="app">
    <Navbar/>
    <router-view @toogleLoad="loading = !loading" />
    <Footer/>
    <Loading v-if="(!$store.state.email && token) || loading"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
import Cookies from 'js-cookie'
export default {
  components:{
    Navbar,
    Footer,
    Loading
  },
  data(){
    return{
      loading:false,
      token:null
    }
  },
  beforeCreate(){
    this.token = Cookies.get('token')
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
</style>
