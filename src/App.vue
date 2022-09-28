<template>
  <div id="app">
    <Navbar/>
    <router-view @toogleLoad="toogle" />
    <Drawer/>
    <Footer/>
    <Loading v-if="(!$store.state.email && token) || loading"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
import Drawer from './components/Drawer.vue'
import Cookies from 'js-cookie'
export default {
  components:{
    Navbar,
    Footer,
    Loading,
    Drawer,
  },
  data(){
    return{
      loading:false,
      token:null
    }
  },
  beforeCreate(){
    this.token = Cookies.get('token')
  },
  methods:{
    toogle(){
      this.loading = !this.loading
      document.body.style.overflow = this.loading ? 'hidden' : 'auto'
    }
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
</style>
