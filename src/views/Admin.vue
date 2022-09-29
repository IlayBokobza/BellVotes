<template>
  <div class="admin">
    <div v-if="subs.length > 0" class="subs-container">
      <div class="card-container" v-for="(sub,i) in subs" :key="i">
        <SubmissionCard @accept="accept($event,sub)" @deny="deny(sub)" @ban="ban(sub)" :videoName="sub.title" :videoId="sub.link"/>
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
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'רשימת חסימות',
      link:'/bans'
    })
  },
  methods:{
    accept(data,s){
      this.$emit('toogleLoad')

      axios.put(`/api/submit/${s._id}`,data).catch(e => {
        //show error is pupup
        console.log(e.response)
        Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})
      })
      .then(() => {
        this.$store.commit('removeSong',s._id)
        this.$emit('toogleLoad')
      })
    },
    async deny(s){
      this.$emit('toogleLoad')
      await axios.delete(`/api/submit/${s._id}`).catch(e => (Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})))
      this.$store.commit('removeSong',s._id)
      this.$emit('toogleLoad')
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

      this.$emit('toogleLoad')
      const {data:ban} = await axios.delete(`/api/ban/${s._id}`).catch(e => (Swal.fire({title:e.response.data,icon:'error',confirmButtonText:'אוקי'})))
      this.$store.commit('removeSong',s._id)
      this.$store.commit('addBan',ban)
      this.$emit('toogleLoad')
    },
  },
  computed:{
    subs(){
      return this.$store.state.submissions
    }
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