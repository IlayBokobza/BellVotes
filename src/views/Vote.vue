<template>
  <div class="vote">

  </div>
</template>

<script>
export default {
  name:'vote',
  created(){
    this.$store.commit('setTitle',{
      text:'הציעו שיר לפעם הבא',
      link:'/submit'
    })
  }
}
</script>