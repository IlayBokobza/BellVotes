<template>
  <div class="admin">
    <div v-if="subs.length > 0" class="subs-container">
      <div class="card-container" v-for="(sub,i) in subs" :key="i">
        <SubmissionCard @accept="accept(sub)" @deny="deny(sub)" @ban="ban(sub)" :videoId="sub.link"/>
      </div>
    </div>
    <h1 v-else>אין בקשות</h1>
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
  methods:{
    async accept(s){
      await axios.put(`/api/submit/${s._id}`).catch(e => (Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})))
      this.subs = this.subs.filter(i => i._id != s._id)
    },
    async deny(s){
      await axios.delete(`/api/submit/${s._id}`).catch(e => (Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})))
      this.subs = this.subs.filter(i => i._id != s._id)
    },
    async ban(s){
      //ask for confirm
      const {isConfirmed} = await Swal.fire({
        title:'?האם אתה בטוח שאתה רוצה לחסום את התלמיד',
        text:'התלמיד יחסם ל30 יום',
        denyButtonText:'לא',
        confirmButtonText:'כן',
        showDenyButton:true,
        icon:'question',
      })

      if(!isConfirmed) return;

      await axios.delete(`/api/submit/ban/${s._id}`).catch(e => (Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})))
      this.subs = this.subs.filter(i => i._id != s._id)
    },
  }
}
</script>

<style lang="scss">
.admin{
  .card-container{
    margin-bottom: 3rem;
  }
}
</style>