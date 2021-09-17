<template>
  <div class="submit">
    <Input text="קישור לשיר ביוטיוב"></Input>
    <Button @click="getVideo" text="הבא" />
  </div>
</template>

<script>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import axios from 'axios'
export default {
  name:'submit',
  created(){
    this.$store.commit('setTitle',{
      text:'בחזרה להצבעה',
      link:'/vote'
    })
  },
  components:{
    Input,
    Button,
  },
  methods:{
    async getVideo(){
      await axios.post('/api/submit/getvideo')
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
}
</style>