<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components:{
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
</style>
