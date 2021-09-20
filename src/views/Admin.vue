<template>
  <div class="admin">
    admin
  </div>
</template>

<script>
export default {
    name:'admin',
    created(){
      this.$store.commit('setTitle',{
        text:'בחזרה לבית',
        link:'/'
      })
    }
}
</script>