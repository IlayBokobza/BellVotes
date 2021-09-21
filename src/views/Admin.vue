<template>
  <div class="admin">
    <div class="card-container" v-for="(sub,i) in subs" :key="i">
      <SubmissionCard :videoId="sub.link"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SubmissionCard from '../components/SubmissionCard.vue'
import Swal from 'sweetalert2'
export default {
  name:'admin',
  components:{
    SubmissionCard,
  },
  data(){
    return{
      subs:[]
    }
  },
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'בחזרה לבית',
      link:'/'
    })
  },
  async created(){
    this.$emit('toogleLoad')

    const {data} = await axios.get('/api/submit').catch(e => {
      console.log(e.response)
      Swal.fire({
        title:e.response.data,
        icon:'error',
        confirmButtonText:'חזור'
      })
    })
    
    this.subs = data

    this.$emit('toogleLoad')
  },
}
</script>

<style lang="scss">
.admin{
  .card-container{
    margin-bottom: 3rem;
    &:not(:last-child){
    }
  }
}
</style>