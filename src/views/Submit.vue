<template>
  <form @submit.prevent="send" class="submit">
    <h2>חוקים</h2>
    <ul>
      <li>הקישור חייב להיות לשיר</li>
      <li>השיר חייב להיות בעברית</li>
      <li>השיר חייב להיות ראוי</li>
      <li>אם אתה עובר על אחד או יותר מהחוקים האלה אתה תוכל תחסם מלשלוח עוד הצעות</li>
    </ul>
    <Input @newValue="updateValue" text="קישור לשיר ביוטיוב"></Input>
    <button class="btn">שלח</button>
  </form>
</template>

<script>
import Input from '../components/Input.vue'
import axios from 'axios'
import qs from 'qs'
import Swal from 'sweetalert2'
export default {
  name:'submit',
  data(){
    return{
      youtubeLink:''
    }
  },
  created(){
    this.$store.commit('setTitle',{
      text:'בחזרה להצבעה',
      link:'/vote'
    })
  },
  components:{
    Input,
  },
  methods:{
    async send(){
      const reg = /https:\/\/(www.)?youtube.com\/watch\?/

      //tests if is a youtube link
      if(!reg.test(this.youtubeLink)){
        Swal.fire({
          title:'קישור לא תקין',
          icon:'error',
          confirmButtonText:"אוקי",
        })
        return
      }

      this.$emit('toogleLoad')
      //removes the domain from the link
      const query = this.youtubeLink.replace(reg,'')
      const queryData = qs.parse(query)
      const videoId = queryData.v

      try{
        await axios.post('/api/submit/',{videoId})
        Swal.fire({
          title:'תודה על ההצעה',
          text:'!אנחנו נסתכל על ההעצה שלך ואם נחליט שהיא מתאימה אנחנו נוסיף אותה',
          confirmButtonText:'!אוקי תודה',
          icon:'success'
        })
      }
      catch(e){
        Swal.fire({
          title:e.response.data,
          icon:'error',
          confirmButtonText:"אוקי",
        })
      }

      this.$emit('toogleLoad')
    },
    updateValue(e){
      this.youtubeLink = e
    }
  }
}
</script>

<style lang="scss">
.submit{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2{
    font-size: 4rem;
  }

  ul{
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>