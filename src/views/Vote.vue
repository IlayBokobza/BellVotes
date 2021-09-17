<template>
  <div class="vote">

  </div>
</template>

<script>
export default {
  name:'vote',
  created(){
    this.$store.commit('setTitle',{
      text:'הציבעו לפעם הבא',
      link:'/submit'
    })
  }
}
</script>