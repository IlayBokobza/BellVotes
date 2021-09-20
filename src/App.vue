<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
    <Loading v-if="!$store.state.email"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
export default {
  components:{
    Navbar,
    Footer,
    Loading
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
</style>
