<template>
  <form @submit.prevent="send" class="submit">
    <h2>חוקים</h2>
    <ul>
      <li v-for="(r,i) in rules" :key="i">{{r}}</li>
    </ul>
    <div class="input-container"><Input @newValue="updateValue" text="קישור לשיר ביוטיוב"></Input></div>
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
  computed:{
    rules(){
      return window.metadata.rules
    }
  },
  methods:{
    async send(){
      const reg = /(?:https?:\/\/)?(?:(www|music)\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/
      const bReg = /https:\/\/youtu\.be\//
      this.youtubeLink = this.youtubeLink.trim()

      //tests if is a youtube link
      let videoId;

      if(bReg.test(this.youtubeLink)){
        videoId = this.youtubeLink.replace(bReg,'')
      }
      else if(reg.test(this.youtubeLink)){
        //removes the domain from the link
        const query = this.youtubeLink.split('?')[1]
        const queryData = qs.parse(query)
        videoId = queryData.v
      }
      else{
        Swal.fire({
          title:'קישור לא תקין! אנא השתמשו בקישור מ-youtube.com',
          icon:'error',
          confirmButtonText:"אוקי",
        })
        return
      }

      this.$emit('toogleLoad')
      
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
          title:e.response?.data,
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

  .input-container{
    width: 50%;

    @media only screen and (max-width: 520px){
        width: 75%;
    }
  }

  h2{
    font-size: 4rem;

    @media only screen and (max-width: 580px){
      margin-bottom: 1rem;
    }
  }

  ul{
    font-size: 2rem;
    margin-bottom: 2rem;

    @media only screen and (max-width: 580px){
      list-style: none;
      text-align: center;
      
      li:not(:last-child){
        margin-bottom: .6rem;
      }

      li:last-child{
        padding: 0 3rem;
      }
    }

  }
}
</style>